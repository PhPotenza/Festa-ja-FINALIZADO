import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calculadora-f',
  templateUrl: './calculadora-f.page.html',
  styleUrls: ['./calculadora-f.page.scss'],
})
export class CalculadoraFPage implements OnInit {

  bebidas = [
    { name: 'Cerveja', isChecked: false },
    { name: 'Refrigerante', isChecked: false },
    { name: 'Suco', isChecked: false },
    { name: 'Água', isChecked: false },
    { name: 'Cachaça', isChecked: false },
    { name: 'Vodka', isChecked: false },
  ];

  constructor(
    private router: Router,
  	private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private actRoute: ActivatedRoute,
    public alertController: AlertController
 ) { }

  ngOnInit() {
  }

  formCalculadorag(){
    this.router.navigate(['/calculadora-g']);
    console.log(this.bebidas);
    }
}
