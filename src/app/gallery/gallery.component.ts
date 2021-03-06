import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Gallery } from '../gallery';
import { GalleryService } from '../gallery.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-gallery',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css',
              '../../../node_modules/simple-keyboard/build/css/index.css']
})
export class GalleryComponent implements OnInit, AfterViewInit {

  closeResult: string;
  productStep: any;
  printId: string;
  idForMail: string;
  
  public modalTitle: string = '';
  public modalId: number;
  public modaldescription: string = '';
  public modalThumbLink: string = '';
  public tempVideoLink: any;
  public modalVideoLink: any;
  public fbShareLink: any;
  public twitterShareLink: any;
  public googleShareLink: any;
  public linkedShareLink: any;
  public tubeShareLink: any;
  public modalPrintingList = [];
  printImage_1: any;
  printImage_2: any;
  printImage_3: any;

  extention:any;
  isGif: boolean = false;

  public serverModalTitle: string = '';

  gallery: Gallery[];
  pritingList = [];
  error = '';
  success = '';
  connection :any;
  service: any;

  login_form: FormGroup;

  keyboardValue: boolean;
  keyboardValueValidation: boolean = false;
  value = "";
  keyboard: Keyboard;
  /*sources = [
    {
      id: 1,
      title: 'Image1',
      description: 'Image1 Description',
      thumbLink: '../../assets/images/image001.jpg',
      videoLink: '../../assets/video001.mp4'
    },
    {
      id: 2,
      title: 'Image2',
      description: 'Image2 Description',
      thumbLink: '../../assets/images/image009.jpeg',
      videoLink: '../../assets/video002.mp4'
    },
    {
      id: 3,
      title: 'Image3',
      description: 'Image3 Description',
      thumbLink: '../../assets/images/image003.jpeg',
      videoLink: '../../assets/video001.mp4'
    },
    {
      id: 4,
      title: 'Image4',
      description: 'Image4 Description',
      thumbLink: '../../assets/images/image004.jpeg',
      videoLink: '../../assets/video002.mp4'
    },
    {
      id: 5,
      title: 'Image5',
      description: 'Image5 Description',
      thumbLink: '../../assets/images/image005.jpeg',
      videoLink: '../../assets/video001.mp4'
    },
    {
      id: 6,
      title: 'Image6',
      description: 'Image6 Description',
      thumbLink: '../../assets/images/image006.jpeg',
      videoLink: '../../assets/video001.mp4'
    },
    {
      id: 7,
      title: 'Image7',
      description: 'Image7 Description',
      thumbLink: '../../assets/images/image007.jpeg',
      videoLink: '../../assets/video001.mp4'
    },
    {
      id: 8,
      title: 'Image8',
      description: 'Image8 Description',
      thumbLink: '../../assets/images/image008.jpg',
      videoLink: '../../assets/video001.mp4'
    },
    {
      id: 9,
      title: 'Image9',
      description: 'Image9 Description',
      thumbLink: '../../assets/images/image009.jpeg',
      videoLink: '../../assets/video001.mp4'
    },
    {
      id: 10,
      title: 'Image4',
      description: 'Image10 Description',
      thumbLink: '../../assets/images/image010.jpeg',
      videoLink: '../../assets/video001.mp4'
    },
    {
      id: 11,
      title: 'Image11',
      description: 'Image11 Description',
      thumbLink: '../../assets/images/image001.jpg',
      videoLink: '../../assets/video001.mp4'
    },
    {
      id: 12,
      title: 'Image12',
      description: 'Image12 Description',
      thumbLink: '../../assets/images/image001.jpg',
      videoLink: '../../assets/video001.mp4'
    }
  ];*/

  constructor(private sanitizer: DomSanitizer, private galleryService: GalleryService, fb: FormBuilder) {
    //email validation
    this.login_form = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      
    });
  }

  ngOnInit() {
    this.getInfo();
    this.check();
    //console.log(this.connection);
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  //Getting gallery data
  public logImageId(Id){
    let imageId = Id.getAttribute('image-id');
    this.modalId = imageId;

    this.galleryService.getAll().subscribe(
      (res: Gallery[]) => {
        this.gallery = res;
      });

    let searchID = this.modalId;
    this.gallery.forEach(sourceInfo=>{
      if(sourceInfo.id == searchID){
        this.modalId = sourceInfo.id;
        this.modalTitle = sourceInfo.title;
        this.modaldescription = sourceInfo.description;
        this.modalThumbLink = sourceInfo.thumbLink;
        this.tempVideoLink = sourceInfo.videoLink+'#t=1';
        this.modalVideoLink = this.safeUrl(sourceInfo.videoLink);
        this.fbShareLink = 'https://www.facebook.com/sharer/sharer.php?u='+sourceInfo.videoLink;
        this.twitterShareLink = 'http://twitter.com/share?text=Cor2tect Video: &url='+sourceInfo.videoLink;
        this.googleShareLink = 'https://plus.google.com/share?hl=en&url='+sourceInfo.videoLink;
        this.linkedShareLink = 'https://www.linkedin.com/shareArticle?mini=true&url='+sourceInfo.videoLink;
        this.modalPrintingList = sourceInfo.PrintingList;
        this.printImage_1 = sourceInfo.PrintingList.printImage_1;
        this.printImage_2 = sourceInfo.PrintingList.printImage_2;
        this.printImage_3 = sourceInfo.PrintingList.printImage_3;
        //console.log(this.isGif);
        //check extension
        this.extention = sourceInfo.videoLink.split('.').pop();
        if(this.extention=='gif'){
          this.isGif =true;
        }
        else{
          this.isGif = false;
        }

      }
    });
  }

  private safeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getInfo(): void {
    this.galleryService.getAll().subscribe(
      (res: Gallery[]) => {
        this.gallery = res;
        //console.log(this.gallery);
        //console.log(this.sources);
      },
      (err) => {
        this.error = err;
        console.log(err);
      }
    );
  }

  //checking connection
  check(): void {
    this.galleryService.checkConnection().subscribe(
      (res: any) => {
        this.connection = res;
        //console.log(this.connection);
        //console.log(this.sources);
      },
      (err) => {
        this.error = err;
        console.log(err);
      }
    );
  }

  //Send id on print
  onPrint(event){
    //console.log('imagID:'+event.target.id);
    this.printId = event.target.id;
    //console.log(this.printId);
    this.galleryService.printID(this.printId)
    .subscribe(
      response=> console.log('Success!',response),
      error=> console.error('Error!', error)      
    );
  }

  //Send email address & id
  onSubmit(emailAdd,event) { 
    this.idForMail = event.target.id;
    console.log(this.idForMail,emailAdd);
    this.galleryService.sendmail(emailAdd,this.idForMail)
    .subscribe(
      response=> console.log('Success!',response),
      error=> console.error('Error!', error)      
    );
    this.value = '';
    //console.log(emailAdd);
    //console.log('Mail is sending ..');
    //console.log(this.form.value.name);
    /*this.service
        .sendmail(this.form.value)
        .subscribe( res => {
          console.log('msg:'+res)
        }, err => {
          console.log(err)
        })*/
    // TO DO
  }

  //Virtual Keyboard
  onChange = (input: string) => {
    this.value = input;
    //console.log("Input changed", input);
    const pattern = /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/;

    if (pattern.test(input)) {
      this.keyboardValueValidation = true;
    }
    else if (!pattern.test(input)) {
      this.keyboardValueValidation = false;
      
    }
    //console.log(this.keyboardValueValidation);
  };

  onKeyPress = (button: string) => {
    //console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}"){ this.handleShift()};
  };
  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
    
  };

  handleShift = () => {
    this.keyboardValue = !this.keyboardValue;
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
  openKb(){
    this.keyboardValue = true;  
  }
  closeKb(){
    this.keyboardValue = false;
    this.value = '';
  }
  clearLink(){
    this.modalVideoLink = '';
  }


}
