import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectrecipeComponent } from './selectrecipe.component';

describe('SelectrecipeComponent', () => {
  let component: SelectrecipeComponent;
  let fixture: ComponentFixture<SelectrecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectrecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectrecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
