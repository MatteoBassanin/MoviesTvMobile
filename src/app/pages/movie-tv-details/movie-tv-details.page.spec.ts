import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieTvDetailsPage } from './movie-tv-details.page';

describe('MovieTvDetailsPage', () => {
  let component: MovieTvDetailsPage;
  let fixture: ComponentFixture<MovieTvDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MovieTvDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
