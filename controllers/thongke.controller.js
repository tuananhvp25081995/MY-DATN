const excel = require('node-excel-export');
var Product = require('../models/product.model');
var calculatePrice = require('./priceproduct');

module.exports.exportExcel1 = async function(req, res){
  var products = await Product.find({});
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
  const styles = {
    shopTitle: {
        fill: {
            fgColor: {
                rgb: '1E90FF'
            }
        },
        font: {
            color: {
                rgb: 'FFFFFFFF'
            },
            sz: 11,
            bold: true,
        }
    },

    tableTitle: {
        fill: {
            fgColor: {
                rgb: 'D3D3D3'
            }
        },
        font: {
            color: {
                rgb: '00000000'
            },
            sz: 11,
            bold: true,
        }
    },

    tableValue: {
        fill: {
            fgColor: {
                rgb: 'DCDCDC'
            }
        },
        font: {
            color: {
                rgb: '00000000'
            },
            sz: 10,
            bold: false,
        }
    },
  }

const maxColumn = 3;

const excelData = [];

let merges = [];

let currentRow = 1;
  merges.push(
      {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
  );
  excelData.push([{
      value: `Hóa đơn tháng 1`,
      style: styles.shopTitle
  }]);

  currentRow++;
  excelData.push([
    {
      value: `Tên Sản phẩm `,
      style: styles.tableTitle
    },
    {
      value: `Số lượng`,
      style: styles.tableTitle
    },
    {
      value: `Giá`,
      style: styles.tableTitle
    }
  ]);
  currentRow++;
  var tongtien = 0;
  for(var i = 0 ; i < products.length ; i++){
    tongtien = tongtien + products[i].quantity * products[i].price
    excelData.push([
      {
        value: `${products[i].name}`,
        style: styles.tableValue
      },
      {
        value: `${products[i].quantity}`,
        style: styles.tableValue
      },
      {
        value:`${pageInfo.calculatePrice(products[i].price)} vnđ`,
        style: styles.tableValue
      }
    ]);
    currentRow++;
  }
  merges.push(
    {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
  );
  excelData.push([{
      value: `Tổng tiền: ${pageInfo.calculatePrice(tongtien)} vnđ`,
      style: styles.shopTitle
  }]);
  currentRow++;

const baseStyle = {
    fill: {
        fgColor: {
            rgb: 'FFFFFFFF'
        }
    },
    font: {
        color: {
            rgb: '00000000'
        },
        sz: 18,
        bold: false,
    }
};
const report = excel.buildExport(
    [
        {
            name: 'Report',
            heading: excelData,
            merges: merges,
            specification: {
                a: {
                    displayName: '',
                    headerStyle: baseStyle,
                    width: 550,
                    height: 100
                },
                b: {
                    displayName: '',
                    headerStyle: baseStyle,
                    width: 350,
                    height: 100
                },
                c: {
                    displayName: '',
                    headerStyle: baseStyle,
                    width: 350,
                    height: 100
                }
            },
            data: [],
        }
    ]
);

res.attachment('thongke.xlsx');

return res.send(report);
}

module.exports.exportExcel1 = async function(req, res){
    var products = await Product.find({});
    let pageInfo = {};
    pageInfo.calculatePrice = calculatePrice;
    const styles = {
      shopTitle: {
          fill: {
              fgColor: {
                  rgb: '1E90FF'
              }
          },
          font: {
              color: {
                  rgb: 'FFFFFFFF'
              },
              sz: 11,
              bold: true,
          }
      },
  
      tableTitle: {
          fill: {
              fgColor: {
                  rgb: 'D3D3D3'
              }
          },
          font: {
              color: {
                  rgb: '00000000'
              },
              sz: 11,
              bold: true,
          }
      },
  
      tableValue: {
          fill: {
              fgColor: {
                  rgb: 'DCDCDC'
              }
          },
          font: {
              color: {
                  rgb: '00000000'
              },
              sz: 10,
              bold: false,
          }
      },
    }
  
  const maxColumn = 3;
  
  const excelData = [];
  
  let merges = [];
  
  let currentRow = 1;
    merges.push(
        {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
    );
    excelData.push([{
        value: `Hóa đơn tháng 1`,
        style: styles.shopTitle
    }]);
  
    currentRow++;
    excelData.push([
      {
        value: `Tên Sản phẩm `,
        style: styles.tableTitle
      },
      {
        value: `Số lượng`,
        style: styles.tableTitle
      },
      {
        value: `Giá`,
        style: styles.tableTitle
      }
    ]);
    currentRow++;
    var tongtien = 0;
    for(var i = 0 ; i < products.length ; i++){
      tongtien = tongtien + products[i].quantity * products[i].price
      excelData.push([
        {
          value: `${products[i].name}`,
          style: styles.tableValue
        },
        {
          value: `${products[i].quantity}`,
          style: styles.tableValue
        },
        {
          value:`${pageInfo.calculatePrice(products[i].price)} vnđ`,
          style: styles.tableValue
        }
      ]);
      currentRow++;
    }
    merges.push(
      {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
    );
    excelData.push([{
        value: `Tổng tiền: ${pageInfo.calculatePrice(tongtien)} vnđ`,
        style: styles.shopTitle
    }]);
    currentRow++;
  
  const baseStyle = {
      fill: {
          fgColor: {
              rgb: 'FFFFFFFF'
          }
      },
      font: {
          color: {
              rgb: '00000000'
          },
          sz: 18,
          bold: false,
      }
  };
  const report = excel.buildExport(
      [
          {
              name: 'Report',
              heading: excelData,
              merges: merges,
              specification: {
                  a: {
                      displayName: '',
                      headerStyle: baseStyle,
                      width: 550,
                      height: 100
                  },
                  b: {
                      displayName: '',
                      headerStyle: baseStyle,
                      width: 350,
                      height: 100
                  },
                  c: {
                      displayName: '',
                      headerStyle: baseStyle,
                      width: 350,
                      height: 100
                  }
              },
              data: [],
          }
      ]
  );
  
  res.attachment('thongke.xlsx');
  
  return res.send(report);
  }

  module.exports.exportExcel1 = async function(req, res){
    var products = await Product.find({});
    let pageInfo = {};
    pageInfo.calculatePrice = calculatePrice;
    const styles = {
      shopTitle: {
          fill: {
              fgColor: {
                  rgb: '1E90FF'
              }
          },
          font: {
              color: {
                  rgb: 'FFFFFFFF'
              },
              sz: 11,
              bold: true,
          }
      },
  
      tableTitle: {
          fill: {
              fgColor: {
                  rgb: 'D3D3D3'
              }
          },
          font: {
              color: {
                  rgb: '00000000'
              },
              sz: 11,
              bold: true,
          }
      },
  
      tableValue: {
          fill: {
              fgColor: {
                  rgb: 'DCDCDC'
              }
          },
          font: {
              color: {
                  rgb: '00000000'
              },
              sz: 10,
              bold: false,
          }
      },
    }
  
  const maxColumn = 3;
  
  const excelData = [];
  
  let merges = [];
  
  let currentRow = 1;
    merges.push(
        {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
    );
    excelData.push([{
        value: `Hóa đơn tháng 1`,
        style: styles.shopTitle
    }]);
  
    currentRow++;
    excelData.push([
      {
        value: `Tên Sản phẩm `,
        style: styles.tableTitle
      },
      {
        value: `Số lượng`,
        style: styles.tableTitle
      },
      {
        value: `Giá`,
        style: styles.tableTitle
      }
    ]);
    currentRow++;
    var tongtien = 0;
    for(var i = 0 ; i < products.length ; i++){
      tongtien = tongtien + products[i].quantity * products[i].price
      excelData.push([
        {
          value: `${products[i].name}`,
          style: styles.tableValue
        },
        {
          value: `${products[i].quantity}`,
          style: styles.tableValue
        },
        {
          value:`${pageInfo.calculatePrice(products[i].price)} vnđ`,
          style: styles.tableValue
        }
      ]);
      currentRow++;
    }
    merges.push(
      {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
    );
    excelData.push([{
        value: `Tổng tiền: ${pageInfo.calculatePrice(tongtien)} vnđ`,
        style: styles.shopTitle
    }]);
    currentRow++;
  
  const baseStyle = {
      fill: {
          fgColor: {
              rgb: 'FFFFFFFF'
          }
      },
      font: {
          color: {
              rgb: '00000000'
          },
          sz: 18,
          bold: false,
      }
  };
  const report = excel.buildExport(
      [
          {
              name: 'Report',
              heading: excelData,
              merges: merges,
              specification: {
                  a: {
                      displayName: '',
                      headerStyle: baseStyle,
                      width: 550,
                      height: 100
                  },
                  b: {
                      displayName: '',
                      headerStyle: baseStyle,
                      width: 350,
                      height: 100
                  },
                  c: {
                      displayName: '',
                      headerStyle: baseStyle,
                      width: 350,
                      height: 100
                  }
              },
              data: [],
          }
      ]
  );
  
  res.attachment('thongke.xlsx');
  
  return res.send(report);
  }
  
  module.exports.exportExcel1 = async function(req, res){
      var products = await Product.find({});
      let pageInfo = {};
      pageInfo.calculatePrice = calculatePrice;
      const styles = {
        shopTitle: {
            fill: {
                fgColor: {
                    rgb: '1E90FF'
                }
            },
            font: {
                color: {
                    rgb: 'FFFFFFFF'
                },
                sz: 11,
                bold: true,
            }
        },
    
        tableTitle: {
            fill: {
                fgColor: {
                    rgb: 'D3D3D3'
                }
            },
            font: {
                color: {
                    rgb: '00000000'
                },
                sz: 11,
                bold: true,
            }
        },
    
        tableValue: {
            fill: {
                fgColor: {
                    rgb: 'DCDCDC'
                }
            },
            font: {
                color: {
                    rgb: '00000000'
                },
                sz: 10,
                bold: false,
            }
        },
      }
    
    const maxColumn = 3;
    
    const excelData = [];
    
    let merges = [];
    
    let currentRow = 1;
      merges.push(
          {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
      );
      excelData.push([{
          value: `Hóa đơn tháng 1`,
          style: styles.shopTitle
      }]);
    
      currentRow++;
      excelData.push([
        {
          value: `Tên Sản phẩm `,
          style: styles.tableTitle
        },
        {
          value: `Số lượng`,
          style: styles.tableTitle
        },
        {
          value: `Giá`,
          style: styles.tableTitle
        }
      ]);
      currentRow++;
      var tongtien = 0;
      for(var i = 0 ; i < products.length ; i++){
        tongtien = tongtien + products[i].quantity * products[i].price
        excelData.push([
          {
            value: `${products[i].name}`,
            style: styles.tableValue
          },
          {
            value: `${products[i].quantity}`,
            style: styles.tableValue
          },
          {
            value:`${pageInfo.calculatePrice(products[i].price)} vnđ`,
            style: styles.tableValue
          }
        ]);
        currentRow++;
      }
      merges.push(
        {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
      );
      excelData.push([{
          value: `Tổng tiền: ${pageInfo.calculatePrice(tongtien)} vnđ`,
          style: styles.shopTitle
      }]);
      currentRow++;
    
    const baseStyle = {
        fill: {
            fgColor: {
                rgb: 'FFFFFFFF'
            }
        },
        font: {
            color: {
                rgb: '00000000'
            },
            sz: 18,
            bold: false,
        }
    };
    const report = excel.buildExport(
        [
            {
                name: 'Report',
                heading: excelData,
                merges: merges,
                specification: {
                    a: {
                        displayName: '',
                        headerStyle: baseStyle,
                        width: 550,
                        height: 100
                    },
                    b: {
                        displayName: '',
                        headerStyle: baseStyle,
                        width: 350,
                        height: 100
                    },
                    c: {
                        displayName: '',
                        headerStyle: baseStyle,
                        width: 350,
                        height: 100
                    }
                },
                data: [],
            }
        ]
    );
    
    res.attachment('thongke.xlsx');
    
    return res.send(report);
    }

module.exports.exportExcel1 = async function(req, res){
  var products = await Product.find({});
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
  const styles = {
    shopTitle: {
        fill: {
            fgColor: {
                rgb: '1E90FF'
            }
        },
        font: {
            color: {
                rgb: 'FFFFFFFF'
            },
            sz: 11,
            bold: true,
        }
    },

    tableTitle: {
        fill: {
            fgColor: {
                rgb: 'D3D3D3'
            }
        },
        font: {
            color: {
                rgb: '00000000'
            },
            sz: 11,
            bold: true,
        }
    },

    tableValue: {
        fill: {
            fgColor: {
                rgb: 'DCDCDC'
            }
        },
        font: {
            color: {
                rgb: '00000000'
            },
            sz: 10,
            bold: false,
        }
    },
  }

const maxColumn = 3;

const excelData = [];

let merges = [];

let currentRow = 1;
  merges.push(
      {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
  );
  excelData.push([{
      value: `Hóa đơn tháng 1`,
      style: styles.shopTitle
  }]);

  currentRow++;
  excelData.push([
    {
      value: `Tên Sản phẩm `,
      style: styles.tableTitle
    },
    {
      value: `Số lượng`,
      style: styles.tableTitle
    },
    {
      value: `Giá`,
      style: styles.tableTitle
    }
  ]);
  currentRow++;
  var tongtien = 0;
  for(var i = 0 ; i < products.length ; i++){
    tongtien = tongtien + products[i].quantity * products[i].price
    excelData.push([
      {
        value: `${products[i].name}`,
        style: styles.tableValue
      },
      {
        value: `${products[i].quantity}`,
        style: styles.tableValue
      },
      {
        value:`${pageInfo.calculatePrice(products[i].price)} vnđ`,
        style: styles.tableValue
      }
    ]);
    currentRow++;
  }
  merges.push(
    {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
  );
  excelData.push([{
      value: `Tổng tiền: ${pageInfo.calculatePrice(tongtien)} vnđ`,
      style: styles.shopTitle
  }]);
  currentRow++;

const baseStyle = {
    fill: {
        fgColor: {
            rgb: 'FFFFFFFF'
        }
    },
    font: {
        color: {
            rgb: '00000000'
        },
        sz: 18,
        bold: false,
    }
};
const report = excel.buildExport(
    [
        {
            name: 'Report',
            heading: excelData,
            merges: merges,
            specification: {
                a: {
                    displayName: '',
                    headerStyle: baseStyle,
                    width: 550,
                    height: 100
                },
                b: {
                    displayName: '',
                    headerStyle: baseStyle,
                    width: 350,
                    height: 100
                },
                c: {
                    displayName: '',
                    headerStyle: baseStyle,
                    width: 350,
                    height: 100
                }
            },
            data: [],
        }
    ]
);

res.attachment('thongke.xlsx');

return res.send(report);
}

module.exports.exportExcel1 = async function(req, res){
    var products = await Product.find({});
    let pageInfo = {};
    pageInfo.calculatePrice = calculatePrice;
    const styles = {
      shopTitle: {
          fill: {
              fgColor: {
                  rgb: '1E90FF'
              }
          },
          font: {
              color: {
                  rgb: 'FFFFFFFF'
              },
              sz: 11,
              bold: true,
          }
      },
  
      tableTitle: {
          fill: {
              fgColor: {
                  rgb: 'D3D3D3'
              }
          },
          font: {
              color: {
                  rgb: '00000000'
              },
              sz: 11,
              bold: true,
          }
      },
  
      tableValue: {
          fill: {
              fgColor: {
                  rgb: 'DCDCDC'
              }
          },
          font: {
              color: {
                  rgb: '00000000'
              },
              sz: 10,
              bold: false,
          }
      },
    }
  
  const maxColumn = 3;
  
  const excelData = [];
  
  let merges = [];
  
  let currentRow = 1;
    merges.push(
        {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
    );
    excelData.push([{
        value: `Hóa đơn tháng 1`,
        style: styles.shopTitle
    }]);
  
    currentRow++;
    excelData.push([
      {
        value: `Tên Sản phẩm `,
        style: styles.tableTitle
      },
      {
        value: `Số lượng`,
        style: styles.tableTitle
      },
      {
        value: `Giá`,
        style: styles.tableTitle
      }
    ]);
    currentRow++;
    var tongtien = 0;
    for(var i = 0 ; i < products.length ; i++){
      tongtien = tongtien + products[i].quantity * products[i].price
      excelData.push([
        {
          value: `${products[i].name}`,
          style: styles.tableValue
        },
        {
          value: `${products[i].quantity}`,
          style: styles.tableValue
        },
        {
          value:`${pageInfo.calculatePrice(products[i].price)} vnđ`,
          style: styles.tableValue
        }
      ]);
      currentRow++;
    }
    merges.push(
      {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
    );
    excelData.push([{
        value: `Tổng tiền: ${pageInfo.calculatePrice(tongtien)} vnđ`,
        style: styles.shopTitle
    }]);
    currentRow++;
  
  const baseStyle = {
      fill: {
          fgColor: {
              rgb: 'FFFFFFFF'
          }
      },
      font: {
          color: {
              rgb: '00000000'
          },
          sz: 18,
          bold: false,
      }
  };
  const report = excel.buildExport(
      [
          {
              name: 'Report',
              heading: excelData,
              merges: merges,
              specification: {
                  a: {
                      displayName: '',
                      headerStyle: baseStyle,
                      width: 550,
                      height: 100
                  },
                  b: {
                      displayName: '',
                      headerStyle: baseStyle,
                      width: 350,
                      height: 100
                  },
                  c: {
                      displayName: '',
                      headerStyle: baseStyle,
                      width: 350,
                      height: 100
                  }
              },
              data: [],
          }
      ]
  );
  
  res.attachment('thongke1.xlsx');
  
  return res.send(report);
  }

  module.exports.exportExcel2 = async function(req, res){
    var products = await Product.find({});
    let pageInfo = {};
    pageInfo.calculatePrice = calculatePrice;
    const styles = {
      shopTitle: {
          fill: {
              fgColor: {
                  rgb: '1E90FF'
              }
          },
          font: {
              color: {
                  rgb: 'FFFFFFFF'
              },
              sz: 11,
              bold: true,
          }
      },
  
      tableTitle: {
          fill: {
              fgColor: {
                  rgb: 'D3D3D3'
              }
          },
          font: {
              color: {
                  rgb: '00000000'
              },
              sz: 11,
              bold: true,
          }
      },
  
      tableValue: {
          fill: {
              fgColor: {
                  rgb: 'DCDCDC'
              }
          },
          font: {
              color: {
                  rgb: '00000000'
              },
              sz: 10,
              bold: false,
          }
      },
    }
  
  const maxColumn = 3;
  
  const excelData = [];
  
  let merges = [];
  
  let currentRow = 1;
    merges.push(
        {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
    );
    excelData.push([{
        value: `Hóa đơn tháng 1`,
        style: styles.shopTitle
    }]);
  
    currentRow++;
    excelData.push([
      {
        value: `Tên Sản phẩm `,
        style: styles.tableTitle
      },
      {
        value: `Số lượng`,
        style: styles.tableTitle
      },
      {
        value: `Giá`,
        style: styles.tableTitle
      }
    ]);
    currentRow++;
    var tongtien = 0;
    for(var i = 0 ; i < products.length ; i++){
      tongtien = tongtien + products[i].quantity * products[i].price * 0.8
      excelData.push([
        {
          value: `${products[i].name}`,
          style: styles.tableValue
        },
        {
          value: `${products[i].quantity - 3}`,
          style: styles.tableValue
        },
        {
          value:`${pageInfo.calculatePrice(products[i].price)} vnđ`,
          style: styles.tableValue
        }
      ]);
      currentRow++;
    }
    merges.push(
      {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
    );
    excelData.push([{
        value: `Tổng tiền: ${pageInfo.calculatePrice(tongtien)} vnđ`,
        style: styles.shopTitle
    }]);
    currentRow++;
  
  const baseStyle = {
      fill: {
          fgColor: {
              rgb: 'FFFFFFFF'
          }
      },
      font: {
          color: {
              rgb: '00000000'
          },
          sz: 18,
          bold: false,
      }
  };
  const report = excel.buildExport(
      [
          {
              name: 'Report',
              heading: excelData,
              merges: merges,
              specification: {
                  a: {
                      displayName: '',
                      headerStyle: baseStyle,
                      width: 550,
                      height: 100
                  },
                  b: {
                      displayName: '',
                      headerStyle: baseStyle,
                      width: 350,
                      height: 100
                  },
                  c: {
                      displayName: '',
                      headerStyle: baseStyle,
                      width: 350,
                      height: 100
                  }
              },
              data: [],
          }
      ]
  );
  
  res.attachment('thongke2.xlsx');
  
  return res.send(report);
  }
  
  module.exports.exportExcel3 = async function(req, res){
      var products = await Product.find({});
      let pageInfo = {};
      pageInfo.calculatePrice = calculatePrice;
      const styles = {
        shopTitle: {
            fill: {
                fgColor: {
                    rgb: '1E90FF'
                }
            },
            font: {
                color: {
                    rgb: 'FFFFFFFF'
                },
                sz: 11,
                bold: true,
            }
        },
    
        tableTitle: {
            fill: {
                fgColor: {
                    rgb: 'D3D3D3'
                }
            },
            font: {
                color: {
                    rgb: '00000000'
                },
                sz: 11,
                bold: true,
            }
        },
    
        tableValue: {
            fill: {
                fgColor: {
                    rgb: 'DCDCDC'
                }
            },
            font: {
                color: {
                    rgb: '00000000'
                },
                sz: 10,
                bold: false,
            }
        },
      }
    
    const maxColumn = 3;
    
    const excelData = [];
    
    let merges = [];
    
    let currentRow = 1;
      merges.push(
          {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
      );
      excelData.push([{
          value: `Hóa đơn tháng 1`,
          style: styles.shopTitle
      }]);
    
      currentRow++;
      excelData.push([
        {
          value: `Tên Sản phẩm `,
          style: styles.tableTitle
        },
        {
          value: `Số lượng`,
          style: styles.tableTitle
        },
        {
          value: `Giá`,
          style: styles.tableTitle
        }
      ]);
      currentRow++;
      var tongtien = 0;
      for(var i = 0 ; i < products.length ; i++){
        tongtien = tongtien + products[i].quantity * products[i].price * 0.7
        excelData.push([
          {
            value: `${products[i].name}`,
            style: styles.tableValue
          },
          {
            value: `${products[i].quantity - 4}`,
            style: styles.tableValue
          },
          {
            value:`${pageInfo.calculatePrice(products[i].price)} vnđ`,
            style: styles.tableValue
          }
        ]);
        currentRow++;
      }
      merges.push(
        {start: {row: currentRow, column: 1}, end: {row: currentRow, column: maxColumn}},
      );
      excelData.push([{
          value: `Tổng tiền: ${pageInfo.calculatePrice(tongtien)} vnđ`,
          style: styles.shopTitle
      }]);
      currentRow++;
    
    const baseStyle = {
        fill: {
            fgColor: {
                rgb: 'FFFFFFFF'
            }
        },
        font: {
            color: {
                rgb: '00000000'
            },
            sz: 18,
            bold: false,
        }
    };
    const report = excel.buildExport(
        [
            {
                name: 'Report',
                heading: excelData,
                merges: merges,
                specification: {
                    a: {
                        displayName: '',
                        headerStyle: baseStyle,
                        width: 550,
                        height: 100
                    },
                    b: {
                        displayName: '',
                        headerStyle: baseStyle,
                        width: 350,
                        height: 100
                    },
                    c: {
                        displayName: '',
                        headerStyle: baseStyle,
                        width: 350,
                        height: 100
                    }
                },
                data: [],
            }
        ]
    );
    
    res.attachment('thongke3.xlsx');
    
    return res.send(report);
    }

  