import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolePermissionsMatrix } from './role-permissions-matrix';

describe('RolePermissionsMatrix', () => {
  let component: RolePermissionsMatrix;
  let fixture: ComponentFixture<RolePermissionsMatrix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePermissionsMatrix],
    }).compileComponents();

    fixture = TestBed.createComponent(RolePermissionsMatrix);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
