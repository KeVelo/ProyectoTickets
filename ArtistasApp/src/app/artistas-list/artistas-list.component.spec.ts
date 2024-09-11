import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistasListComponent } from './artistas-list.component';

describe('ArtistasListComponent', () => {
  let component: ArtistasListComponent;
  let fixture: ComponentFixture<ArtistasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistasListComponent]
    });
    fixture = TestBed.createComponent(ArtistasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
