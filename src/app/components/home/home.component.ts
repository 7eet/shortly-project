import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myForm!: FormGroup;
  submitedForm = false;
  inputErrorMessage = "Please add a link"
  arrayOfShortenUrls: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      url : new FormControl('', Validators.required)
    });
  }


  onSubmit(form: FormGroup) {
    if (this.myForm.valid) {
      let url = this.myForm.get('url')?.value;
      this.apiService.getShortenLink(url).subscribe((response)=>{ 
        if (response.ok) {
          this.arrayOfShortenUrls.unshift(response.body);
        }
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!!',
          text: error
        })
      });
    } else {
      this.submitedForm = true
    }
    console.log(this.arrayOfShortenUrls);
  }


  copyShortenLink(result: any) {
    navigator.clipboard.writeText(result.full_short_link2);
    let btn = document.getElementsByClassName(`${result.code}`)[0];
    btn.textContent = "Copied!"
    btn.classList.add("backgroundVoilet");
  }

  get url() {
    return this.myForm.get('url');
  }

}
