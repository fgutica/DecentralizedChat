import { Observable, fromEventPattern  } from 'rxjs';
import { pick }  from 'underscore/underscore-esm';

export function on$(node, cleanup = true, opts = {}): Observable<any> {
    return fromEventPattern(
        handler => {
            // there is no way to off() an on() until at least one value is trigerred
            // so that we can access the event listener to off() it
            const signal = { stop: false };
            node.on((data, key, at, ev) => {
                if (signal.stop) {
                    ev.off();
                } else {
                    // modifying data directly does not seem to work...
                    handler(cleanup ? pick(data, (v, k, o) => v !== null && k !== '_') : data);
                }
            }, opts);
            return signal;
        },
        (handler, signal) => { signal.stop = true; }
    );
}

export function once$(node): Observable<any> {
    return new Observable(o => node.once(v => {
        o.next(v);
        o.complete();
    }));
}