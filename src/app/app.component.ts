import { Component } from '@angular/core';

import '../style/app.scss';

@Component({
    selector: 'switch-news',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title: string;

    constructor() {
        this.title = 'switch-news-tracker';
    }
}