import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-printers',
    templateUrl: './printers.component.html',
    styleUrls: ['./printers.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PrintersComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
