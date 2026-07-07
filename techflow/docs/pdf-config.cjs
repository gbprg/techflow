module.exports = {
  stylesheet: ['docs/relatorio.css'],
  pdf_options: {
    format: 'A4',
    margin: '18mm 16mm',
    printBackground: true
  },
  launch_options: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
};
