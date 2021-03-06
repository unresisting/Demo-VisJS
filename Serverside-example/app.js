const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const fs = require('fs')

app.get('/', (req, res) => {
    let json = fs.readFileSync(path.join(__dirname, 'config.json'));
    res.send(`
  <html>
  <head>
      <title>vis demo</title>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>
  </head>
  <body>
      <div id="mynetwork"></div>
      <script>
          let options = {
              edges: {
                  arrows: {
                      to: {
                          enabled: true,
                          scaleFactor: 0.75,
                          type: 'arrow'
                      },
                      // to: {enabled: false, scaleFactor:0.5, type:'bar'},
                      middle: {
                          enabled: false,
                          scaleFactor: 1,
                          type: 'arrow'
                      },
                      from: {
                          enabled: true,
                          scaleFactor: 0.3,
                          type: 'arrow'
                      }
                      // from: {enabled: false, scaleFactor:0.5, type:'arrow'}
                  },
                  arrowStrikethrough: true,
                  chosen: true,
                  color: {
                      // color:'#848484',
                      color: 'red',
                      highlight: '#848484',
                      hover: '#848484',
                      inherit: 'from',
                      opacity: 1.0
                  },
                  dashes: false,
                  font: {
                      color: '#343434',
                      size: 14, // px
                      face: 'arial',
                      background: 'none',
                      strokeWidth: 2, // px
                      strokeColor: '#ffffff',
                      align: 'horizontal',
                      multi: false,
                      vadjust: 0,
                      bold: {
                          color: '#343434',
                          size: 14, // px
                          face: 'arial',
                          vadjust: 0,
                          mod: 'bold'
                      },
                      ital: {
                          color: '#343434',
                          size: 14, // px
                          face: 'arial',
                          vadjust: 0,
                          mod: 'italic'
                      },
                      boldital: {
                          color: '#343434',
                          size: 14, // px
                          face: 'arial',
                          vadjust: 0,
                          mod: 'bold italic'
                      },
                      mono: {
                          color: '#343434',
                          size: 15, // px
                          face: 'courier new',
                          vadjust: 2,
                          mod: ''
                      }
                  }
              },
              // http://visjs.org/docs/network/physics.html#
              physics: {
                  enabled: true,
                  barnesHut: {
                      gravitationalConstant: -2000,
                      centralGravity: 0.3,
                      // springLength: 95,
                      springLength: 175,
                      springConstant: 0.04,
                      damping: 0.09,
                      avoidOverlap: 0
                  },
                  forceAtlas2Based: {
                      gravitationalConstant: -50,
                      centralGravity: 0.01,
                      springConstant: 0.08,
                      springLength: 100,
                      damping: 0.4,
                      avoidOverlap: 0
                  },
                  repulsion: {
                      centralGravity: 0.2,
                      springLength: 200,
                      springConstant: 0.05,
                      nodeDistance: 100,
                      damping: 0.09
                  },
                  hierarchicalRepulsion: {
                      centralGravity: 0.0,
                      springLength: 100,
                      springConstant: 0.01,
                      nodeDistance: 120,
                      damping: 0.09
                  },
                  maxVelocity: 50,
                  minVelocity: 0.1,
                  solver: 'barnesHut',
                  stabilization: {
                      enabled: true,
                      iterations: 1000,
                      updateInterval: 100,
                      onlyDynamicEdges: false,
                      fit: true
                  },
                  timestep: 0.5,
                  adaptiveTimestep: true
              },
          };
          let container = document.getElementById('mynetwork');
          let json = ${json};
          let data = {
                  nodes: json.nodes,
                  edges: json.edges
              };
              let network = new vis.Network(container, data, options);
      </script>
  </body>
  </html>
  `)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})