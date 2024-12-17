import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';  // Ionic testovací modul
import { Tab2Page } from './tab2.page';
import { MovieService } from '../services/movie.service';  // Import MovieService

// Vytvoríme mock verziu MovieService
class MockMovieService {
  getFavorites() {
    return [];  // Vrátime prázdny zoznam obľúbených filmov pre test
  }
}

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let mockMovieService: MockMovieService;

  beforeEach(async () => {
    // Konfigurácia TestBed pre testovanie Tab2Page
    await TestBed.configureTestingModule({
      declarations: [Tab2Page],               // Deklarovanie Tab2Page komponenty
      imports: [IonicModule.forRoot()],        // Import IonicModule pre testovanie Ionic komponentov
      providers: [
        { provide: MovieService, useClass: MockMovieService }  // Použitie mock verzie MovieService
      ]
    }).compileComponents();

    // Vytvorenie inštancie komponentu a spustenie detekcie zmien
    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    mockMovieService = TestBed.inject(MovieService);  // Injektovanie mock služby
    fixture.detectChanges();
  });

  it('should create', () => {
    // Test, ktorý kontroluje, či sa komponent správne vytvorí
    expect(component).toBeTruthy();
  });

  it('should call getFavorites on MovieService and set favorites', () => {
    // Test, ktorý overí, či sa metóda getFavorites volá a správne nastaví obľúbené filmy
    spyOn(mockMovieService, 'getFavorites').and.callThrough();  // Sledovanie volania getFavorites
    component.ngOnInit();
    expect(mockMovieService.getFavorites).toHaveBeenCalled();  // Skontrolujeme, či bola metóda volaná
    expect(component.favorites).toEqual([]);  // Skontrolujeme, či obľúbené filmy sú nastavené správne
  });
});
