import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed ,fakeAsync, tick} from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services';
import { HomeComponent } from './home.component';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const UserServiceSpy = jasmine.createSpyObj('UserService', ['edit']);
const fb = new FormBuilder()
describe('Home Component Isolated Test', () => {
    let component: HomeComponent;
  ​  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
          ReactiveFormsModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
     component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
 
​
    it('Component successfully created', () => {
      expect(component).toBeTruthy();
    });
  ​
    it('component initial state', () => {
      expect(component.submitted).toBeFalsy();
      expect(component.editForm).toBeDefined();
      expect(component.editForm.invalid).toBeTruthy();
    });
  ​
    it('submitted should be true when onSubmit()', () => {
      component.updateUser();
      expect(component.submitted).toBeTruthy();
    });
    function updateForm(username, ) {
        component.editForm.controls['username'].setValue(username);
      }

    it('Form invalid should be true when form is invalid', (() => {
      updateForm(component.editForm.value.username);
      expect(component.editForm.invalid).toBeTruthy();
    }));

    
  it('should update the username if edit api called successfully', fakeAsync(() => {
    updateForm(component.editForm.value.username);
    fixture.detectChanges();
     UserServiceSpy.edit.and.returnValue(Promise.resolve(null));
    advance(fixture);    
  }));
  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }
  });