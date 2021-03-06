﻿import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from '@app/_models';
import { GunDB } from '@app/_services';
import { on$ } from '@app/_helpers';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;
    profile: any
    constructor(
        private accountService: AccountService,
        private db: GunDB
    ) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }


}