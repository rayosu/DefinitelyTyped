import {Commands} from './commands';
import tcp = require('net');

declare namespace escpos {
    export namespace Constants {
        /**
         * [FEED_CONTROL_SEQUENCES Feed control sequences]
         * @type {Object}
         */
        export enum FEED_CONTROL_TYPE {
            LF = 'LF',   // Print and line feed
            GLF = 'GLF',   // Print and feed paper (without spaces between lines)
            FF = 'FF',   // Form feed
            CR = 'CR',   // Carriage return
            HT = 'HT',   // Horizontal tab
            VT = 'VT',   // Vertical tab
        }

        /**
         * [HARDWARE Printer hardware]
         * @type {Object}
         */
        export enum HARDWARE_TYPE {
            HW_INIT = '\x1b\x40', // Clear data in buffer and reset modes
            HW_SELECT = '\x1b\x3d\x01', // Printer select
            HW_RESET = '\x1b\x3f\x0a\x00', // Reset printer hardware
        }

        /**
         * [BITMAP_FORMAT description]
         * @type {Object}
         */
        export enum BITMAP_FORMAT_TYPE {
            S8 = 'S8',
            D8 = 'D8',
            S24 = 'S24',
            D24 = 'D24'
        }

        export enum QRCODE_LEVEL {
            L = 'L', // correct level 7%
            M = 'M', // correct level 15%
            Q = 'Q', // correct level 25%
            H = 'H'  // correct level 30%
        }

        export enum TXT_STYLE {
            NORMAL = 'NORMAL',
            TXT_BOLD = 'B',
            TXT_ITALIC = 'I',
            TXT_UNDERL = 'U',
            TXT_UNDERL2 = 'U2',
            TXT_BOLD_ITALIC = 'BI',
            TXT_BOLD_ITALIC_UNDERL = 'BIU',
            TXT_BOLD_ITALIC_UNDERL2 = 'BIU2',
            TXT_BOLD_UNDERL = 'BU',
            TXT_BOLD_UNDERL2 = 'BU2',
            TXT_ITALIC_UNDERL = 'IU',
            TXT_ITALIC_UNDERL2 = 'IU2',
        }

        export enum MIME_TYPE {
            PNG = 'image/png',
            JPG = 'image/jpg',
            JPEG = 'image/jpeg',
            GIF = 'image/gif',
            BMP = 'image/bmp',
        }

        export enum BARCODE_TYPE {
            UPC_A = 'UPC_A', // Barcode type UPC-A
            UPC_E = 'UPC_E', // Barcode type UPC-E
            EAN13 = 'EAN13', // Barcode type EAN13
            EAN8 = 'EAN8', // Barcode type EAN8
            CODE39 = 'CODE39', // Barcode type CODE39
            ITF = 'ITF', // Barcode type ITF
            NW7 = 'NW7', // Barcode type NW7
            CODE93 = 'CODE93', // Barcode type CODE93
            CODE128 = 'CODE128', // Barcode type CODE128
        }

        export enum TXT_ALIGN {
            'LEFT' = 'LT', // Left justification
            'CENTER' = 'CT', // Centering
            'RIGHT' = 'RT', // Right justification
        }
    }

    export interface Adapter {
        /**
         * open device
         * @return {[type]} [description]
         */
        open(callback?: Function);

        /**
         * close device
         * @return {[type]} [description]
         */
        close(callback?: Function, options?: any);

        /**
         * write data to device
         * @return {[type]} [description]
         */
        write(data: any, callback: Function);
    }

    export class USB implements Adapter {
        /**
         * [create USB by 'vid' and 'pid' or else find one]
         * @param  {[type]} vid [description]
         * @param  {[type]} pid [description]
         * @return {[type]}     [description]
         */
        constructor(vid?: string, pid?: string);

        /**
         * [findPrinter description]
         * @return {[type]} [description]
         */
        public static findPrinter(): USB[];

        /**
         * [get USB Device by 'vid' and 'pid' or else find one]
         * @param  {[type]} vid [description]
         * @param  {[type]} pid [description]
         * @return {[type]}     [description]
         */
        public static getDevice(vid?: string, pid?: string): USB;

        /**
         * [open usb device]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        public open(callback?: Function): USB;

        /**
         * [close usb device]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        public close(callback?: Function): USB;

        /**
         * [function write]
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        public write(data: Buffer, callback: Function): USB;
    }


    export class Serial implements Adapter {
        /**
         * SerialPort device
         * @param {[type]} port
         * @param {[type]} options [default: {baudRate: 9600,autoOpen: false}]
         */
        constructor(port: number, options?: { baudRate: number, autoOpen: boolean });

        /**
         * open deivce
         * @param  {Function} callback
         * @return {[type]}
         */
        public open(callback?: Function);

        /**
         * close device
         * @param  {Function} callback  [description]
         * @param  {int}      timeout   [allow manual timeout for emulated COM ports (bluetooth, ...)]
         * @return {[type]} [description]
         */
        public close(callback?: Function, timeout?: number);

        /**
         * write data to serialport device
         * @param  {[type]}   buf      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        public write(data: Buffer, callback: Function);
    }


    export class Network implements Adapter {

        /**
         * Network Adapter
         * @param {[type]} address
         * @param {[type]} port
         */
        constructor(address: string, port: number);

        /**
         * connect to remote device
         * @praram {[type]} callback
         * @return
         */
        public open(callback?: Function);

        /**
         * [close description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        public close(callback?: Function);

        /**
         * write data to printer
         * @param {[type]} data -- byte data
         * @return
         */
        public write(data: Buffer, callback: Function);
    }


    // @ts-ignore
    export class Console implements Adapter {
        /**
         * [open description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        public open(callback?: Function): Console;

        /** @deprecated */
        public close(callback?: Function, options?: any);

        /**
         * [write description]
         * @param  {[type]} data [description]
         // * @param  {[type]} bit  [description]
         * @return {[type]}      [description]
         */
        public write(data: Buffer): Console;
    }

    export class Image {

        /**
         * [Image description]
         * @param {[type]} pixels [description]
         */
        constructor(pixels: any);

        /**
         * [load description]
         * @param  {[type]}   url      [support: url, path, buffer, image data]
         * @param  {[type]}   type     [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        // @ts-ignore
        public static load(url: string, type: _.MIME_TYPE, callback?: Function);

        /**
         * [description]
         * @return {{width: number, height: number, colors: number}}     [description]
         */
        public size(): { width: number, height: number, colors: number };

        /**
         * [toBitmap description]
         * @param  {[type]} density [description]
         * @return {[type]}         [description]
         */
        public toBitmap(density: number)

        /**
         * [toRaster description]
         * @return {[type]} [description]
         */
        public toRaster();
    }

    export class Printer {
        /**
         * [function ESC/POS Printer]
         * @param  {[Adapter]} adapter [eg: usb, network, or serialport]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        constructor(adapter: Adapter, options);

        public static create(device: Adapter): Printer;


        /**
         * Set printer model to recognize model-specific commands.
         * Supported models: [ null, 'qsprinter' ]
         *
         * For generic printers, set model to null
         *
         * [function set printer model]
         * @param  {[String]}  model [mandatory]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public model(_model: string): Printer;

        /**
         * Fix bottom margin
         * @param  {[Number]} size
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public marginBottom(size: number): Printer;

        /**
         * Fix left margin
         * @param  {[Number]} size
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public marginLeft(size: number): Printer;

        /**
         * Fix right margin
         * @param  {[Number]} size
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public marginRight(size: number): Printer;

        /**
         * [function print]
         * @param  {[String]}  content  [mandatory]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public print(content: any): Printer;

        /**
         * [function print pure content with End Of Line]
         * @param  {[String]}  content  [mandatory]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public println(content: any): Printer;

        /**
         * [function Print encoded alpha-numeric text with End Of Line]
         * @param  {[String]}  content  [mandatory]
         * @param  {[String]}  encoding [optional]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public text(content: string, encoding?: string): Printer;

        /**
         * [function Print encoded alpha-numeric text without End Of Line]
         * @param  {[String]}  content  [mandatory]
         * @param  {[String]}  encoding [optional]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public pureText(content: string, encoding?: string): Printer;

        /**
         * [function encode text]
         * @param  {[String]}  encoding [mandatory]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public encode(encoding: string): Printer;

        /**
         * [line feed]
         * @param  {[type]}    lines   [description]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public feed(n?: number): Printer;

        /**
         * [feed control sequences]
         * @param  {[type]}    ctrl     [description]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public control(ctrl: _.FEED_CONTROL_TYPE): Printer;

        /**
         * [text align]
         * @param  {[type]}    align    [description]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public align(align: _.TXT_ALIGN): Printer;

        /**
         * [font family]
         * @param  {[type]}    family  [description]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public font(family: string): Printer;

        /**
         * [font style]
         * @param  {[type]}    type     [description]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        // @ts-ignore
        public style(type: _.TXT_STYLE): Printer;

        /**
         * [font size]
         * @param  {[String]}  width   [font size width, 1≤ n ≤8]
         * @param  {[String]}  height  [font size height, 1≤ n ≤8]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public size(width: number, height: number): Printer;

        /**
         * [set character spacing]
         * @param  {[type]}    n     [default 0]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public spacing(n?: number): Printer;

        /**
         * [set line spacing]
         * @param  {[type]} n [linespace pix, default 2]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public lineSpace(n?: number): Printer ;

        /**
         * [hardware]
         * @param  {[type]}    hw       [description]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public hardware(hw: string): Printer;

        /**
         * [barcode]
         * @param  {[type]}    code     [description]
         * @param  {[type]}    type     [description]
         * @param  {[type]}    options  [description]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        // @ts-ignore
        public barcode(code: string, type: _.BARCODE_TYPE, options?: object): Printer;

        /**
         * [print qrcode]
         * @param  {[type]} code    [qrcode value]
         * @param  {[type]} version [default 3]
         * @param  {[type]} level   [default 'L': correct level 7%]
         * @param  {[type]} size    [ 1 ~ 24, default 6 when 'qsprinter' model, else default 12 ]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        // @ts-ignore
        public qrcode(code: string, version: number, level: _.QRCODE_LEVEL, size: number): Printer;

        /**
         * [print qrcode image]
         * @param  {[String]}   content  [qrimage data]
         * @param  {[Object]}   options  [default { type: 'png', mode: 'dhdw' } ]
         * @param  {[Function]} callback [callback]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public qrimage(content: string, options?: { type: string, mode: string }, callback?: Function): Printer;

        /**
         * 打印图片
         * @param image 图片对象
         * @param density
         */
        // @ts-ignore
        public image(image: Image, density: _.BITMAP_FORMAT_TYPE): Printer;

        /**
         * [raster description]
         * @param  {[type]} image [description]
         * @param  {[type]} mode  [description]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public raster(image: Image, mode: string): Printer;

        /**
         * [function Send pulse to kick the cash drawer]
         * @param  {[type]} pin [description]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public cashdraw(pin?: number): Printer;

        /**
         * Printer Buzzer (Beep sound)
         * @param  {[Number]} n Refers to the number of buzzer times
         * @param  {[Number]} t Refers to the buzzer sound length in (t * 100) milliseconds.
         */
        public beep(n: number, t: number): Printer;

        /**
         * Send data to hardware and flush buffer
         * @param  {Function} callback
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public flush(callback?: Function): Printer;

        /**
         * [function Cut paper]
         * @param  {[type]} part [description]
         * @param  {[Number]} feed [description]
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public cut(part?: boolean, feed?: number): Printer;

        /**
         * [close description]
         * @param  {Function} callback [description]
         * @param  {[type]}   options  [description]
         * @return {[type]}            [description]
         */
        public close(callback?: Function, options?: any): Printer;

        /**
         * [color select between two print color modes, if your printer supports it]
         * @param  {Number} color - 0 for primary color (black) 1 for secondary color (red)
         * @return {[Printer]} printer  [the escpos printer instance]
         */
        public color(color): Printer;
    }

    export class Screen {
        /**
         * [function ESC/POS Screen]
         * @param  {[Adapter]} adapter [eg: usb, network, or serialport]
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        constructor(adapter: Adapter, encoding: string);

        public static create(device: Adapter): Screen;

        /**
         * Clears all displayed characters
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public clear(callback?: Function): Screen;

        /**
         * Clears the line containing the cursor
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public clearLine(callback?: Function): Screen;

        /**
         * Moves the cursor up one line
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public moveUp(callback?: Function): Screen;

        /**
         * Moves the cursor one character position to the left
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public moveLeft(callback?: Function): Screen;

        /**
         * Moves the cursor one character position to the right
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public moveRight(callback?: Function): Screen;

        /**
         * Moves the cursor down one line
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public moveDown(callback?: Function): Screen;

        /**
         * Moves the cursor to the left-most position on the upper line (home position)
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public moveHome(callback?: Function): Screen;

        /**
         * Moves the cursor to the right-most position on the current line
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public moveMaxRight(callback?: Function): Screen;

        /**
         * Moves the cursor to the left-most position on the current line
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public moveMaxLeft(callback?: Function): Screen;

        /**
         * Moves the cursor to the bottom position
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public moveBottom(callback?: Function): Screen;

        /**
         * Moves the cursor to the nth position on the mth line
         * @param  {[type]}   n       [description]
         * @param  {[type]}   m       [description]
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public move(n: number, m: number): Screen;

        /**
         * Selects overwrite mode as the screen display mode
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public overwrite(callback?: Function): Screen;

        /**
         * Selects vertical scroll mode as the screen display mode
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public verticalScroll(callback?: Function): Screen;

        /**
         * Selects horizontal scroll mode as the display screen mode
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public horizontalScroll(callback?: Function): Screen;

        /**
         * Turn cursor display mode on/off
         * @param  {[type]}   display [description]
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public cursor(display: boolean): Screen;

        /**
         * Sets display screen blank interval
         * @param  {[type]}   step    [description]
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public blink(step: number): Screen;

        /**
         * Sets the counter time and displays it in the bottom right of the screen
         * @param  {[type]}   h       [description]
         * @param  {[type]}   m       [description]
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public timer(h: number, m: number): Screen;

        /**
         * Displays the time counter at the right side of the bottom line
         * @param  {Function} callback
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public displayTimer(): Screen;

        /**
         * Set brightness
         * @param  {[type]}   level   [description]
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public brightness(level: number): Screen;

        /**
         * Selects or cancels reverse display of the characters received after this command
         * @param  {[type]}   n       [description]
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public reverse(n: boolean): Screen;

        /**
         * Set status confirmation for DTR signal
         * @param  {[type]}   n       [description]
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public DTR(n: boolean): Screen;

        /**
         * [function print]
         * @param  {[String]}  content  [mandatory]
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public print(content: string): Screen;

        /**
         * [function Print encoded alpha-numeric text with End Of Line]
         * @param  {[String]}  content  [mandatory]
         * @param  {[String]}  encoding [optional]
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public text(content: string, encoding: string): Screen;

        /**
         * [function encode text]
         * @param  {[String]}  encoding [mandatory]
         * @return {[Screen]} Screen  [the escpos Screen instance]
         */
        public encode(encoding: string): Screen;

        /**
         * Send data to hardware and flush buffer
         * @param  {Function} callback
         * @return {[Screen]} printer  [the escpos printer instance]
         */
        public flush(callback?: Function): Screen;

        /**
         * [close description]
         * @param  {Function} callback [description]
         * @param  {[type]}   options  [description]
         * @return {[Screen]}            [description]
         */
        public close(callback?: Function, options?: any): Screen;
    }

    export class Server implements tcp.Server {
        constructor(device: Adapter);
        listen(port: number, hostname?: string, backlog?: number, listeningListener?: Function): this;
        listen(port: number, hostname?: string, listeningListener?: Function): this;
        listen(port: number, backlog?: number, listeningListener?: Function): this;
        listen(port: number, listeningListener?: Function): this;
        listen(path: string, backlog?: number, listeningListener?: Function): this;
        listen(path: string, listeningListener?: Function): this;
        listen(options: tcp.ListenOptions, listeningListener?: Function): this;
        listen(handle: any, backlog?: number, listeningListener?: Function): this;
        listen(handle: any, listeningListener?: Function): this;
        listen(port: any, hostname?: any, backlog?: any, listeningListener?: any);
        close(callback?: Function): this;
        address(): { port: number; family: string; address: string; };
        getConnections(cb: (error: Error, count: number) => void): void;
        ref(): this;
        unref(): this;
        maxConnections: number;
        connections: number;
        addListener(event: string, listener: Function): this;
        emit(event: string | symbol, ...args: any[]): boolean;
        on(event: string, listener: Function): this;
        once(event: string, listener: Function): this;
        prependListener(event: string, listener: Function): this;
        prependOnceListener(event: string, listener: Function): this;
        removeListener(event: string | symbol, listener: Function): this;
        removeAllListeners(event?: string | symbol): this;
        setMaxListeners(n: number): this;
        getMaxListeners(): number;
        listeners(event: string | symbol): Function[];
        eventNames(): (string | symbol)[];
        listenerCount(type: string | symbol): number;
    }

    export class commands extends Commands {
    }

    export function Printer2(adapter: Adapter);
}
export = escpos;
