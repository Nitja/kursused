import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KoeraVaadePage } from './koera-vaade.page';

describe('KoeraVaadePage', () => {
  let component: KoeraVaadePage;
  let fixture: ComponentFixture<KoeraVaadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoeraVaadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KoeraVaadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
