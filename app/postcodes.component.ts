import { Component, OnInit } from "@angular/core";
import { Postcode} from "./Postcode";
import { PostcodeService } from "./postcode.service";

@Component({    
    selector: "pw-postcodes",
    template: `<h1>{{title}}</h1>
        <ul class="postcodes">
            <li *ngFor="let postcode of postcodes" 
                (click)="onSelect(postcode)" 
                [class.selected]="postcode === selectedPostcode">
                <span class="badge">{{postcode.code}}</span> {{postcode.description}}
            </li>
        </ul>
        <postcode-detail [postcode]="selectedPostcode"></postcode-detail>
    `,
    styles: [`
        .selected { background-color: #cfd8dc !important; color: white; }
        .postcodes { 
            margin: 0 0 2em 0;
            list-style-type: none;
            padding: 0;
            width: 15em;
        }
        .postcodes li {
            cursor: pointer;
            position: relative;
            left: 0;
            background-color: #eee;
            margin: .5em;
            padding: .3em 0;
            height: 1.6em;
            border-radius: 4px;
        }
        .postcodes li:selected:hover {
            background-color: #bbd8dc !important;
            color: white;
        }
        .postcodes li:hover {
            color: #607d8b;
            background-color: #ddd;
            left: .1em;
        }
        .postcodes .text { position: relative; top: -3px; }
        .postcodes .badge {
            display: inline-block;
            font-size: small;
            color: white;
            padding: 0.8em 0.7em 0 0.7em;
            background-color: #607d8b;
            line-height: 1em;
            position: relative;
            left: -1px;
            top: -4px;
            height: 1.8em;
            margin-right: .8em;
            border-radius: 4px 0 0 4px;
        }
    `],
    providers: [ PostcodeService ]
})

export class PostcodesComponent { 
    title: string = "Post codes";
    postcodes: Postcode[];
    selectedPostcode: Postcode;

    constructor(private postcodeService: PostcodeService) { }

    ngOnInit(): void {        
        this.loadPostcodes();
    }

    onSelect(postcode: Postcode): void {
        this.selectedPostcode = postcode;
    }     

    loadPostcodes(): void {
        this.postcodeService.getPostcodes().then(postcodes =>
            this.postcodes = postcodes
        );        
    }
}