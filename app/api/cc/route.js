import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import yaml from 'js-yaml';

export async function GET(request) {
    const jsonDirectory = path.join(process.cwd(), 'yaml');
  
  //const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  const yamldata = await fs.readFile(jsonDirectory + '/cc.yaml', 'utf8');
  
//const data = yaml.load(yamlFile).component;
    return NextResponse.json({yamldata: yamldata});
}