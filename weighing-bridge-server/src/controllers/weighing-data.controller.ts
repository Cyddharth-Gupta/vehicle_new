import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import AWS from 'aws-sdk';
import {WeighingData} from '../models';
import {WeighingDataRepository} from '../repositories';
const pdfKit = require('html-pdf-node');
const { readFile } = require('fs/promises');
import { Canvas } from 'canvas';
import JsBarcode from 'jsbarcode';

const config = {
  accessKeyId: 'AKIA5R6PRO3WQXNRZFZO',
  secretAccessKey: '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',
}
const s3 = new AWS.S3(config);

const slugify = function (string:string) {
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
};



export class WeighingDataController {
  constructor(
    @repository(WeighingDataRepository)
    public weighingDataRepository : WeighingDataRepository,
  ) {}

  @post('/weighing-data')
  @response(200, {
    description: 'WeighingData model instance',
    content: {'application/json': {schema: getModelSchemaRef(WeighingData)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeighingData, {
            title: 'NewWeighingData',
            
          }),
        },
      },
    })
    weighingData: WeighingData,
  ): Promise<WeighingData> {
    let options = { format: 'A4' };
    weighingData.createdAt = new Date()

    let file = { content: await readFile('public/receipt.html', 'utf8') };
    file.content = file.content.replace('{{zoneName}}', weighingData.zoneName);
    file.content = file.content.replace('{{address}}', weighingData.address);
    file.content = file.content.replace('{{city}}', weighingData.city);
    file.content = file.content.replace('{{state}}', weighingData.state);
    file.content = file.content.replace('{{address}}', weighingData.address);
    file.content = file.content.replace('{{date}}', new Date(weighingData.createdAt || '').toDateString());
    file.content = file.content.replace('{{employeeName}}', weighingData.employeeName);
    file.content = file.content.replace('{{time}}', new Date(weighingData.createdAt || '').toLocaleTimeString());
    file.content = file.content.replace('{{zoneName}}', weighingData.zoneName);

    file.content = file.content.replace('{{slipNumber}}', weighingData.slipNumber);
    file.content = file.content.replace('{{supplier}}', weighingData.supplier);
    file.content = file.content.replace('{{material}}', weighingData.material);
    file.content = file.content.replace('{{vehicleNumber}}', weighingData.vehicleNumber);
    file.content = file.content.replace('{{weightType}}', weighingData.weightType);
    file.content = file.content.replace('{{measureType}}', weighingData.measureType);
    file.content = file.content.replace('{{grossWeight}}', weighingData.grossWeight);
    file.content = file.content.replace('{{tareWeight}}', weighingData.tareWeight);
    file.content = file.content.replace('{{netWeight}}', weighingData.netWeight);

    const canvas = new Canvas(100, 50, "image");
    JsBarcode(canvas, weighingData.slipNumber);

    const barcodeFile = await s3.upload({
      Bucket: 'weighing-bridge-resources',
      Key: `barcodes/${weighingData.slipNumber}.png`,
      Body: canvas.toBuffer(),
      ContentType: `image/png`
    }).promise();

    file.content = file.content.replace('{{barcodeUrl}}', barcodeFile.Location);
    weighingData.barcodeUrl = barcodeFile.Location;

    let pdfBuffer = await pdfKit.generatePdf(file, options);

    const s3File = await s3.upload({
      Bucket: 'weighing-bridge-resources',
      Key: `receipts/${slugify(weighingData.zoneName)}/${weighingData.slipNumber}.pdf`,
      Body: pdfBuffer,
      ContentType: `application/pdf`
    }).promise();

    weighingData.receiptUrl = s3File.Location;

    let data = await this.weighingDataRepository.create(weighingData);
    return data;
  }

  @get('/weighing-data/count')
  @response(200, {
    description: 'WeighingData model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WeighingData) where?: Where<WeighingData>,
  ): Promise<Count> {
    return this.weighingDataRepository.count(where);
  }

  @get('/weighing-data')
  @response(200, {
    description: 'Array of WeighingData model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WeighingData, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WeighingData) filter?: Filter<WeighingData>,
  ): Promise<WeighingData[]> {
    return this.weighingDataRepository.find(filter);
  }

  @patch('/weighing-data')
  @response(200, {
    description: 'WeighingData PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeighingData, {partial: true}),
        },
      },
    })
    weighingData: WeighingData,
    @param.where(WeighingData) where?: Where<WeighingData>,
  ): Promise<Count> {
    return this.weighingDataRepository.updateAll(weighingData, where);
  }

  @get('/weighing-data/{id}')
  @response(200, {
    description: 'WeighingData model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WeighingData, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(WeighingData, {exclude: 'where'}) filter?: FilterExcludingWhere<WeighingData>
  ): Promise<WeighingData> {
    return this.weighingDataRepository.findById(id, filter);
  }

  @patch('/weighing-data/{id}')
  @response(204, {
    description: 'WeighingData PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeighingData, {partial: true}),
        },
      },
    })
    weighingData: WeighingData,
  ): Promise<void> {
    await this.weighingDataRepository.updateById(id, weighingData);
  }

  @put('/weighing-data/{id}')
  @response(204, {
    description: 'WeighingData PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() weighingData: WeighingData,
  ): Promise<void> {
    await this.weighingDataRepository.replaceById(id, weighingData);
  }

  @del('/weighing-data/{id}')
  @response(204, {
    description: 'WeighingData DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.weighingDataRepository.deleteById(id);
  }
}
