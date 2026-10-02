import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersRolesPage } from './users-roles-page';

describe('UsersRolesPage', () => {
  let component: UsersRolesPage;
  let fixture: ComponentFixture<UsersRolesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersRolesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersRolesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
