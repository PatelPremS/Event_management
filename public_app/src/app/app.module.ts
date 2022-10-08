import { MatDatepickerModule } from '@angular/material/datepicker';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { AuthGuard } from './service/auth.guard';
import { EventService } from './service/event.service';
import { AuthService } from './service/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { EventsComponent } from './components/events/events.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FeaturedEventsComponent } from './components/featured-events/featured-events.component';
import { MembersComponent } from './components/members/members.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { TodayEventsComponent } from './components/today-events/today-events.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    HomeComponent,
    BreadcrumbComponent,
    FooterComponent,
    HeaderComponent,
    FeaturedEventsComponent,
    MembersComponent,
    UserAccountComponent,
    AboutUsComponent,
    ContactUsComponent,
    CreateEventComponent,
    TodayEventsComponent,
    HeroSectionComponent,
    EventDetailsComponent,
    EditEventComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    EditorModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports: [
    MatDatepickerModule
  ],
  providers: [
    AuthService,
    EventService,
    AuthGuard,
    MatDatepickerModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
