import { Component, ViewChild } from '@angular/core';


import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detalle-lista',
  templateUrl: './detalle-lista.component.html',
  styleUrls: ['./detalle-lista.component.css']
})
export class DetalleListaComponent {


  displayedColumns: string[] = [
    'id',
    'foto', 'nombre', 'lugar', 
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    
  ) {}


}
