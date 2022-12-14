export enum ModalType {
  HOVER = 'HOVER',
  FIXED = 'FIXED'
}

export enum Orientation {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export const LeftProperties = 'lg:left-1 lg:top-0 lg:bottom-0 lg:translate-y-0 translate-x-0'
export const RightProperties = 'lg:right-1 lg:top-0 lg:bottom-0 lg:translate-y-0 translate-x-0'

export function getOrientationDialogProps(orientation: string) : string {
  if (orientation === Orientation.LEFT) {
    return LeftProperties
  } else {
    return RightProperties
  }
}
