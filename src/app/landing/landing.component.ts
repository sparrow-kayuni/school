import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import { LandingNavbarComponent } from '../landing-navbar/landing-navbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, LandingNavbarComponent],
  template: `
  <landing-navbar></landing-navbar>
  <section class="hero__section">
    <img src="assets/school_outdoors.webp" class="hero__image"/>
    <div class="d-block hero__links">
      <ul class="menu__list d-flex" style="width: 100%">
        <li><a href="#about">About Us</a></li>
        <li><a routerLink="/admissions">Apply</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#">Parents Portal</a></li>
      </ul>
    </div>
  </section>
  <section id="about" class="d-grid about__section " style="background-color: var(--bs-white)">
    <div class="head__sidebar p-4">
      <img src="assets/vecteezy_default-female-avatar-profile-icon-social-media-chatting_24766959.jpg" 
        class="teacher__image" />
      <p>Headteacher name</p>
      <p><strong>Headteacher</strong></p>
    </div>  
    <div class="about__box p-4">
      <h2 style="text-align: center; font-weight: bold;">Welcome to <span>School name</span></h2>
      <p style="text-align: justify;">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, eligendi quas saepe perferendis dignissimos expedita dolorem, a voluptatibus libero unde ipsam consequatur! Enim eveniet vitae, odit voluptates provident praesentium sequi asperiores doloribus adipisci maxime nulla, nam perferendis, maxime ad impedit molestias facere est, aperiam corporis tempora nulla voluptatem.</p>
      <h4 style="text-align: center; ">Mission Statement</h4>
      <p style="text-align: center;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est omnis consequatur sint neque, iste delectus?</p>
      <h4 style="text-align: center;">Motto</h4>
      <p style="text-align: center;">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </div>
    <div class="vicehead__sidebar p-4">
      <img src="assets/vecteezy_default-male-avatar-profile-icon-social-media-chatting_25337669.jpg" 
        class="teacher__image" />
      <p>Vice Headteacher name</p>
      <p><strong>Vice Headteacher</strong></p>
    </div> 
  </section>
  <section class="news__section p-4" id="news">
    <h3>News and announcements</h3>
    <div class="d-grid news__tabs">
      <div class="news__card p-2" *ngFor="let news of [0, 0, 0, 0, 0]">
        <img src="" class="news__image">
        <h4>Lorem ipsum dolor sit amet consectetur.</h4>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, rerum...</p>
      </div>
    </div>
  </section>
  <footer class="footer p-4" style="height: 65vh; background-color: var(--bs-gray-800)">
    <div>
      <div class="footer__heading">Contact Us</div>
      <ul class="footer__list">
        <li>Phone: XXXXXXXXXXXX</li>
        <li>Email: XXXXXXXXXXX</li>
        <li>Address: Lorem ipsum dolor sit amet.</li>
      </ul>
    </div>
    <div>
      <div class="footer__heading">Quick Links</div>
      <ul class="footer__list">
        <li><a href="">Home</a></li>
        <li><a href="/admissions">Apply</a></li>
        <li><a href="#">Our staff</a></li>
        <li><a href="#">Parents</a></li>
        <li><a href="#">Teachers</a></li>
        <li><a href="#">Admin</a></li>
      </ul>
    </div>
  </footer>
  `,
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  title="app-landing";
}
