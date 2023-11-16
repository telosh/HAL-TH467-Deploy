function notfound(){
    const sty = `
        
    `;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(sty));
    document.head.appendChild(style);

    return(
        <div>
            <div>
                404                                           
            </div>
        </div>
    );
}

export default notfound;