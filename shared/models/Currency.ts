export default class Currency {
    static properties: { [key: string]: { label: string; } } = {
      currencyCode: { label: 'Länder Code'},
      exchangeRate: { label: 'Wechselkurs'},
    };
  
    public currencyCode?: string;
  
    constructor(
      public currencyCode: string,
      public exchangeRate: number | ''
    ) {}
  }
  