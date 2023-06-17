export default class Currency {
    static properties: { [key: string]: { label: string; } } = {
      currencyCode: { label: 'Länder Code'},
      exchangeRate: { label: 'Wechselkurs'},
      label: { label: 'Name'}
    };
  
    public currencyCode: string| undefined;
  
    constructor(
      public exchangeRate: number | '',
      public label: string
    ) {}
  }
  