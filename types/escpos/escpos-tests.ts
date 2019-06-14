import {Constants as _, USB, Serial, Network, Console, Image, Printer, Screen, Server, commands, Printer2} from 'escpos';
const usb  = new USB();
const serial  = new Serial(0, {baudRate: 9600,autoOpen: false});
const network  = new Network('192.168.1.109', 8080);
const consl  = new Console();

let image = new Image([]);
image = Image.load('https://github.githubassets.com/images/modules/open_graph/github-logo.png', _.MIME_TYPE.PNG)

let printer = new Printer(usb, { encoding: 'GB18030' });
printer = new Printer(serial, { encoding: 'GB18030' });
printer = new Printer(network, { encoding: 'GB18030' });
printer = new Printer(consl, { encoding: 'GB18030' });
const screen = new Screen(serial, 'GB18030');
usb.open(function (error) {
    printer
        .align(_.TXT_ALIGN.LEFT)
        .barcode('1234567', _.BARCODE_TYPE.EAN8)
        .beep(1, 10)
        .cashdraw(2)
        .close()
        .color(0)
        .control(_.FEED_CONTROL_TYPE.LF)
        .cut()
        .encode('GB18030')
        .feed()
        .flush()
        .font('A')
        .hardware('INIT')
        .image(image, _.BITMAP_FORMAT_TYPE.D24)
        .lineSpace()
        .marginBottom(5)
        .marginLeft(5)
        .marginRight(5)
        .model('qsprinter')
        .print('The quick brown fox jumps over the lazy dog')
        .println('The quick brown fox jumps over the lazy dog')
        .pureText('The quick brown fox jumps over the lazy dog', 'GB18030')
        .qrcode('123456789', 3, _.QRCODE_LEVEL.L, 6)
        .qrimage('https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/escpos', { type: 'png', mode: 'dhdw' })
        .raster(image, 'dhdw')
        .size(1, 1)
        .spacing(0)
        .style(_.TXT_STYLE.TXT_BOLD_ITALIC_UNDERL)
        .text('The quick brown fox jumps over the lazy dog', 'GB18030');
});
usb.open(function (error) {
    usb.write(Buffer.from(''), function (error) {
        usb.close(function (error) {
        });
    });
});
serial.open(function (error) {
    serial.write(Buffer.from(''), function (error) {
        serial.close(function (error) {
        }, 1);
    });
});
network.open(function (error) {
    network.write(Buffer.from(''), function (error) {
        network.close(function (error) {
        });
    })
});
consl.open(function (error) {
    consl.write(Buffer.from(''));
});

const server = new Server(usb);
usb.open(() => {
    server.listen(6000, err => {
        console.log('Your printer is running at', server.address().port);
    });
});

(async () => {

    const device  = await USB.getDevice();
    const printer = await Printer.create(device);

    await printer.text('hello');
    await printer.cut();
    await printer.close();

    console.log('print job done');

})();

