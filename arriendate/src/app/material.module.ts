import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio"
import { MatNativeDateModule } from "@angular/material/core";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CdkTableModule } from "@angular/cdk/table";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';

 
@NgModule({
    exports:[
        MatToolbarModule,
        MatGridListModule,
        MatStepperModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatRadioModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        CdkTableModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatTooltipModule,
        FlexLayoutModule,
        MatButtonModule
    ]
})

export class MaterialModule{

}