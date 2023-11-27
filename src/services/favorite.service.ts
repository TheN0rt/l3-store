import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorite';

class FavoriteService {
   init() {
      this._updCounters();
   }

   // Функции на добавление/удаление товаров в/из favorite 
  async addFavorite(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
  }

  async removeFavorite(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
  }

//   Функция на проверку продуктов в избранном
  async isInFavorite(product: ProductData){
    const products = await this.get()
    return products.some(({ id }) => id === product.id);
  }

  async clear() {
      await localforage.removeItem(DB);
      this._updCounters();
   }

   async get(): Promise<ProductData[]> {
      return (await localforage.getItem(DB)) || [];
   }

   async set(data: ProductData[]) {
      await localforage.setItem(DB, data);
      this._updCounters();
   }

   private async _updCounters() {
      const products = await this.get();
      // const count = products.length >= 10 ? '9+' : products.length;
      const count = products.length
  
      //@ts-ignore
      document.querySelector('.fav')?.style.display = count ? 'inline-block' : 'none';
      //@ts-ignore
      // document.querySelectorAll('.js__fav-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
    }
}

export const favoriteService = new FavoriteService();