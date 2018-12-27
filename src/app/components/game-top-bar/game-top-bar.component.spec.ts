import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTopBarComponent } from './game-top-bar.component';

describe('GameTopBarComponent', () => {
  let component: GameTopBarComponent;
  let fixture: ComponentFixture<GameTopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTopBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
