interface IPurchaseConfirmationBuilder {
  cartValue: number | undefined;
  orderTime: number | undefined;
  orderNumber: string | undefined;
  brandValue: number | undefined;
  cartCount: number | undefined;
  cartCountCheckout: number | undefined;
}

class PurchaseConfirmation {
  private cartValue: number | undefined;
  private orderTime: number | undefined;
  private orderNumber: string | undefined;
  private brandValue: number | undefined;
  private cartCount: number | undefined;
  private cartCountCheckout: number | undefined;

  constructor(builder: IPurchaseConfirmationBuilder) {
    this.cartValue = builder.cartValue;
    this.orderTime = builder.orderTime;
    this.orderNumber = builder.orderNumber;
    this.brandValue = builder.brandValue;
    this.cartCount = builder.cartCount;
    this.cartCountCheckout = builder.cartCountCheckout;
  }

  static get Builder(): typeof PurchaseConfirmationBuilder {
    return PurchaseConfirmationBuilder;
  }

  values(): any {
    if (this.orderTime === null || this.orderTime === undefined) {
      this.orderTime = new Date().getTime();
    }
    const purchaseValues = {
      ...this.propIfPresent('cartValue', this.cartValue),
      ...this.propIfPresent('orderTime', this.orderTime?.toString()),
      ...this.propIfPresent('orderNumber', this.orderNumber),
      ...this.propIfPresent('brandValue', this.brandValue),
      ...this.propIfPresent('cartCount', this.cartCount),
      ...this.propIfPresent('cartCountCheckout', this.cartCountCheckout),
    };
    console.log('Purchase values: ' + JSON.stringify(purchaseValues));
    return purchaseValues;
  }

  private propIfPresent<T>(key: string, value?: T): any {
    return value === null || value === undefined ? {} : { [key]: value };
  }
}

class PurchaseConfirmationBuilder implements IPurchaseConfirmationBuilder {
  private _cartValue: number | undefined;
  private _orderTime: number | undefined;
  private _orderNumber: string | undefined;
  private _brandValue: number | undefined;
  private _cartCount: number | undefined;
  private _cartCountCheckout: number | undefined;

  get cartValue(): number | undefined {
    return this._cartValue;
  }

  get orderTime(): number | undefined {
    return this._orderTime;
  }

  get orderNumber(): string | undefined {
    return this._orderNumber;
  }

  get brandValue(): number | undefined {
    return this._brandValue;
  }

  get cartCount(): number | undefined {
    return this._cartCount;
  }

  get cartCountCheckout(): number | undefined {
    return this._cartCountCheckout;
  }

  setCartValue(cartValue: number): this {
    this._cartValue = cartValue;
    return this;
  }

  setOrderTime(orderTime: number): this {
    this._orderTime = orderTime;
    return this;
  }

  setOrderNumber(orderNumber: string): this {
    this._orderNumber = orderNumber;
    return this;
  }

  setBrandValue(brandValue: number): this {
    this._brandValue = brandValue;
    return this;
  }

  setCartCount(cartCount: number): this {
    this._cartCount = cartCount;
    return this;
  }

  setCartCountCheckout(cartCountCheckout: number): this {
    this._cartCountCheckout = cartCountCheckout;
    return this;
  }

  build(): PurchaseConfirmation {
    return new PurchaseConfirmation(this);
  }
}
export default PurchaseConfirmation;
