import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent]
        });
    })

    it('should have a title', () => {
        const app = TestBed.createComponent(AppComponent);
        app.detectChanges();
        expect(app.debugElement.componentInstance.title).toEqual('switch-news-tracker');
    });
});