import { GoBind } from "./gobind";

const mock: GoBind = {
  dataDefinitions: [
    {
      Name: "CursorAcceleration",
      Description: "Cursor acceleration Value",
      Type: 1,
    },
    {
      Name: "CursorFriction",
      Description: "Cursor friction Value",
      Type: 1,
    },
    {
      Name: "WheelAcceleration",
      Description: "Wheel acceleration Value",
      Type: 0,
    },
    {
      Name: "WheelFriction",
      Description: "Wheel friction Value",
      Type: 0,
    },
    {
      Name: "SniperModeSpeed",
      Description: "Speed in sniper mode",
      Type: 0,
    },
    {
      Name: "TeleportDistance",
      Description: "Teleport distance",
      Type: 0,
    },
  ],
  dataNameValueMap: {
    CursorAcceleration: "4.0",
    CursorFriction: "3.6",
    SniperModeSpeed: "1",
    TeleportDistance: "300",
    WheelAcceleration: "40",
    WheelFriction: "30",
  },
  functionDefinitions: [
    {
      Name: "Activate",
      Category: "System",
      Description: "Activate Mouseable",
      When: 1,
      Order: 1,
    },
    {
      Name: "Deactivate",
      Category: "System",
      Description: "Deactivate Mouseable",
      When: 0,
      Order: 2,
    },
    {
      Name: "MoveRight",
      Category: "Move",
      Description: "Move cursor →",
      When: 0,
      Order: 3,
    },
    {
      Name: "MoveRightUp",
      Category: "Move",
      Description: "Move cursor ↗",
      When: 0,
      Order: 4,
    },
    {
      Name: "MoveUp",
      Category: "Move",
      Description: "Move cursor ↑",
      When: 0,
      Order: 5,
    },
    {
      Name: "MoveLeftUp",
      Category: "Move",
      Description: "Move cursor ↖",
      When: 0,
      Order: 6,
    },
    {
      Name: "MoveLeft",
      Category: "Move",
      Description: "Move cursor ←",
      When: 0,
      Order: 7,
    },
    {
      Name: "MoveLeftDown",
      Category: "Move",
      Description: "Move cursor ↙",
      When: 0,
      Order: 8,
    },
    {
      Name: "MoveDown",
      Category: "Move",
      Description: "Move cursor ↓",
      When: 0,
      Order: 9,
    },
    {
      Name: "MoveRightDown",
      Category: "Move",
      Description: "Move cursor ↘",
      When: 0,
      Order: 10,
    },
    {
      Name: "SniperMode",
      Category: "Move",
      Description: "Slow down to increase accuracy",
      When: 0,
      Order: 11,
    },
    {
      Name: "ClickLeft",
      Category: "Button",
      Description: "Click left mouse button",
      When: 0,
      Order: 12,
    },
    {
      Name: "ClickRight",
      Category: "Button",
      Description: "Click right mouse button",
      When: 0,
      Order: 13,
    },
    {
      Name: "ClickMiddle",
      Category: "Button",
      Description: "Click middle mouse button",
      When: 0,
      Order: 14,
    },
    {
      Name: "WheelUp",
      Category: "Button",
      Description: "Wheel ↑",
      When: 0,
      Order: 15,
    },
    {
      Name: "WheelDown",
      Category: "Button",
      Description: "Wheel ↓",
      When: 0,
      Order: 16,
    },
    {
      Name: "WheelRight",
      Category: "Button",
      Description: "Wheel →",
      When: 0,
      Order: 17,
    },
    {
      Name: "WheelLeft",
      Category: "Button",
      Description: "Wheel ←",
      When: 0,
      Order: 18,
    },
    {
      Name: "TeleportForward",
      Category: "Move-2",
      Description: "Teleport cursor to the direction it is moving",
      When: 0,
      Order: 19,
    },
    {
      Name: "TeleportRight",
      Category: "Move-2",
      Description: "Teleport cursor →",
      When: 0,
      Order: 20,
    },
    {
      Name: "TeleportRightUp",
      Category: "Move-2",
      Description: "Teleport cursor ↗",
      When: 0,
      Order: 21,
    },
    {
      Name: "TeleportUp",
      Category: "Move-2",
      Description: "Teleport cursor ↑",
      When: 0,
      Order: 22,
    },
    {
      Name: "TeleportLeftUp",
      Category: "Move-2",
      Description: "Teleport cursor ↖",
      When: 0,
      Order: 23,
    },
    {
      Name: "TeleportLeft",
      Category: "Move-2",
      Description: "Teleport cursor ←",
      When: 0,
      Order: 24,
    },
    {
      Name: "TeleportLeftDown",
      Category: "Move-2",
      Description: "Teleport cursor ↙",
      When: 0,
      Order: 25,
    },
    {
      Name: "TeleportDown",
      Category: "Move-2",
      Description: "Teleport cursor ↓",
      When: 0,
      Order: 26,
    },
    {
      Name: "TeleportRightDown",
      Category: "Move-2",
      Description: "Teleport cursor ↘",
      When: 0,
      Order: 27,
    },
  ],
  functionNameKeyMap: {
    Activate: {
      IsDouble: false,
      IsAlt: true,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 74,
    },
    ClickLeft: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 65,
    },
    ClickMiddle: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 83,
    },
    ClickRight: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 68,
    },
    Deactivate: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 71,
    },
    MoveDown: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 74,
    },
    MoveLeft: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 72,
    },
    MoveLeftDown: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    MoveLeftUp: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    MoveRight: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 76,
    },
    MoveRightDown: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    MoveRightUp: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    MoveUp: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 75,
    },
    SniperMode: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 32,
    },
    TeleportDown: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    TeleportForward: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 70,
    },
    TeleportLeft: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    TeleportLeftDown: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    TeleportLeftUp: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    TeleportRight: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    TeleportRightDown: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    TeleportRightUp: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    TeleportUp: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    WheelDown: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 78,
    },
    WheelLeft: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    WheelRight: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 0,
    },
    WheelUp: {
      IsDouble: false,
      IsAlt: false,
      IsControl: false,
      IsShift: false,
      IsWin: false,
      KeyCode: 85,
    },
  },
};

export default mock;
