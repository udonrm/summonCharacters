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
      if (!this.destination) {
        this.selectDestination();
      }
      await this.moveTowardDestination();
    }
  };

  private moveTowardDestination = async (): Promise<void> => {
    if (!this.destination) {
      return;
    }
    let diffTop = this.destination.top - this.current.top;
    let diffLeft = this.destination.left - this.current.left;

    while (Math.abs(diffTop) > 1) {
      const moveDistanceTowardTop = diffTop > 0 ? 1 : -1;
      this.current.top += moveDistanceTowardTop;
      this.applyPositionToStyle(this.current);
      diffTop -= moveDistanceTowardTop;
      await this.sleep(16);
    }
    this.current.top = this.destination.top;

    while (Math.abs(diffLeft) > 1) {
      const moveDistanceTowardLeft = diffLeft > 0 ? 1 : -1;
      this.current.left += moveDistanceTowardLeft;
      this.applyPositionToStyle(this.current);
      diffLeft -= moveDistanceTowardLeft;
      await this.sleep(16);
    }
    this.current.left = this.destination.left;

    this.destination = undefined;
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
