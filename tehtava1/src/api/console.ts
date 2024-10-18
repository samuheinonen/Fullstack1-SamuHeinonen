


export function logExample(){
    console.log('This is a standard message');
    console.warn('This is a warning message');
    console.error('This is error message');
    console.info('This is info message');


    console.group('Grouped messages');
    console.log('Message inside group');
    console.log('Another message in group');
    console.groupEnd();
}


export function consoleInit(): void {
    const el = document.getElementById("target1");
    if (el){
        el.onpointerdown = logExample;
    }
}