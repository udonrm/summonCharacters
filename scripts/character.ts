export type Position = {
  top: number;
  left: number;
};

type ApplyPositionToStyle = (position: Position) => void;

export class Character {
  current: Position;
  destination?: Position;
  applyPositionToStyle: ApplyPositionToStyle;

  constructor(applyPositionToStyle: ApplyPositionToStyle) {
    this.applyPositionToStyle = applyPositionToStyle;
    this.current = { top: 0, left: 0 };
  }

  public toString = (): string => {
    return `現在地は (${this.current.top}, ${this.current.left})です `;
  };

  public startAction = async (): Promise<void> => {
    while (true) {
      this.selectDestination();
      this.moveToDestination();
      await this.sleep(10000);
    }
  };

  private moveToDestination = (): void => {
    if (!this.destination) {
      return;
    }
    this.current.top = this.destination.top;
    this.current.left = this.destination.left;

    this.applyPositionToStyle(this.current);
  };

  /**
   * 次の目的地を選択する
   */
  private selectDestination = (): void => {
    this.destination = {
      top: this.getRandomInt(),
      left: this.getRandomInt(),
    };
  };

  /**
   * 1から100のランダムな整数を返す
   */
  private getRandomInt = () => {
    return Math.random() * 100;
  };

  /**
   * [ms]秒間スリープする
   */
  private sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
}
