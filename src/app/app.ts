import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './app.html',  // Make sure filename matches exactly (app.component.html usually)
  styleUrl: './app.css'       // Make sure filename matches exactly (app.component.css usually)
})
export class App implements OnInit {

  // ==========================================================
  // FIXED: Added '=' sign and type ': any[]'
  // ==========================================================
  featuredList: any[] = [
    {
      "title": "REDKEY",
      "description": "a clone of crunchyroll in my style.",
      "tags": ["Angular", "Node.js", "TypeScript", "GSAP"],
      "image": "./img/redkey.png",
      "link": "https://www.instagram.com/p/DT5sgx5geKC/?img_index=1",
      "gallery": ["./img/redkey.png", "./img/redkey.png"]
    },
    {
      "title": "Thali.",
      "description": "a website where you can find your favourite web templates and design it without writting a single line of code.",
      "tags": ["Laravel", "PHP", "MYSQL", "GSAP"],
      "image": "./img/thali.png",
      "link": "https://github.com/xrmortal1212/Thali.",
      "gallery": ["./img/thali.png", "./img/thali.png"]
    }
  ];

  projectsList: any[] = [
    {
      "title": "Historical Monuments",
      "description": "This website is all about our hidden gems. Explore the architecture and history.",
      "tags": ["Web Design", "HTML", "CSS", "JS"],
      "image": "./img/1.PNG",
      "link": "https://xrmortal1212.github.io/Historical-Monuments/",
      "gallery": ["./img/1.PNG", "./img/1.PNG", "./img/1.PNG"]
    },
    {
      "title": "EntertainX",
      "description": "EntertainX is a website for entertainment, Anime, Movies and much more.",
      "tags": ["HTML", "CSS", "JS", "JSON"],
      "image": "./img/3.PNG",
      "link": "https://xrmortal1212.github.io/Entertainx/",
      "gallery": ["./img/3.PNG", "./img/3.PNG"]
    },
    {
      "title": "Weather App",
      "description": "current weather conditions and forecasts for a given location using live API.",
      "tags": ["Weather API", "HTML", "CSS", "JS"],
      "image": "./img/5.PNG",
      "link": "https://xrmortal1212.github.io/Weather-App/",
      "gallery": ["./img/5.PNG", "./img/5.PNG"]
    },
    {
      "title": "Pakistani With Bhoot",
      "description": "I create digital art and graphics using various software tools like Adobe Animate.",
      "tags": ["Adobe Animate", "Adobe After-Effects"],
      "image": "./img/Capture4.PNG",
      "link": "https://www.youtube.com/shorts/NZpWWAv-sic",
      "gallery": ["./img/p2.png", "./img/p3.png"]
    }
  ];

  selectedProject: any = null;
  currentGalleryIndex: number = 0;
  contactForm: FormGroup;
  isSending = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // ==========================================================
    // NOTE: Maine isay COMMENT kar diya hai.
    // Agar aapke paas JSON file nahi hai to yeh data overwrite kar ke blank kar deta hai.
    // Abhi yeh Hardcoded data (upar wala) use karega.
    // ==========================================================
    
    /*
    this.http.get<any>('/projects.json').subscribe({
      next: (res) => {
        this.featuredList = res.featuredProjects;
        this.projectsList = res.projects;
        console.log('Featured:', this.featuredList);
        console.log('All Projects:', this.projectsList);
      },
      error: (err) => console.error('Error fetching JSON:', err)
    });
    */
  }

  openModal(item: any) {
    this.selectedProject = item;
    this.currentGalleryIndex = 0; // Always start from first image
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }

  // Next Image Logic
  nextImage(event: Event) {
    event.stopPropagation(); // Modal band hone se roko
    if (this.selectedProject && this.selectedProject.gallery) {
      const totalImages = this.selectedProject.gallery.length;
      // Loop: Agar last image hai to wapas 0 pe aa jaye
      this.currentGalleryIndex = (this.currentGalleryIndex + 1) % totalImages;
    }
  }

  // Previous Image Logic
  prevImage(event: Event) {
    event.stopPropagation();
    if (this.selectedProject && this.selectedProject.gallery) {
      const totalImages = this.selectedProject.gallery.length;
      // Loop: Agar 0 par hai to last image pe chala jaye
      this.currentGalleryIndex = (this.currentGalleryIndex - 1 + totalImages) % totalImages;
    }
  }

  sendEmail() {
    console.log('Button clicked! Function started.');

    if (this.contactForm.valid) {
      this.isSending = true;

      const serviceID = 'service_seouurt';
      const templateID = 'template_ixoavcy';
      const publicKey = 'nu-HAUVXrdLdqUk72';

      emailjs.send(serviceID, templateID, this.contactForm.value, publicKey)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent successfully!');
          this.contactForm.reset();
        })
        .catch((error) => {
          console.error('FAILED...', error);
          alert('Failed to send message. Check console.');
        })
        .finally(() => {
          this.isSending = false;
        });

    } else {
      console.log('Form is invalid', this.contactForm.errors);
      this.contactForm.markAllAsTouched(); // Errors dikhane ke liye
      alert('Please fill in all required fields.');
    }
  }
}