import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesTvPage } from './movies-tv.page';

describe('MoviesTvPage', () => {
  let component: MoviesTvPage;
  let fixture: ComponentFixture<MoviesTvPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MoviesTvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
