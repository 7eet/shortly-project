import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
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
  arrayOfShortenUrls: any[] = []

  constructor(private apiService: ApiService, private clipboardApi: ClipboardService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      url : new FormControl('', Validators.required)
    });
  }


  onSubmit(form: FormGroup) {
    if (this.myForm.valid) {
      let url = this.myForm.get('url')?.value;
      Swal.showLoading();
      this.apiService.getShortenLink(url).subscribe((response)=>{ 
        if (response.ok) {
          this.arrayOfShortenUrls.unshift(response.body);
        }
        this.myForm.reset();
      Swal.close();
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error
        })
      });
    } 
  }

  // to copy text  on button click;
  copyShortenLink(result: any) {
    this.clipboardApi.copyFromContent(result.full_short_link2)

    // change text and background color on click
    let btn = document.getElementsByClassName(`${result.code}`)[0];
    btn.textContent = "Copied!"
    btn.classList.add("backgroundVoilet");
  }

  get url() {
    return this.myForm.get('url');
  }

}
