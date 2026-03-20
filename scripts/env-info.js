#!/usr/bin/env node

// Script para mostrar informações do ambiente atual
// Execute com: node scripts/env-info.js

const fs = require('fs');
const path = require('path');

// Lê variáveis de ambiente do processo
const nodeEnv = process.env.NODE_ENV || 'development';
const appWithoutScorm = process.env.VITE_APP_WITHOUT_SCORM || 'false';
const scormDebug = process.env.VITE_ENABLE_SCORM_DEBUG_PROD || 'false';

console.log('\n🔍 Ambiente Atual:');
console.log('================');

// Determina o tipo de ambiente
const isScorm = appWithoutScorm === 'false';
const isDebug = scormDebug === 'true';
const isDev = nodeEnv === 'development';

console.log(`📦 NODE_ENV: ${nodeEnv}`);
console.log(`🔧 SCORM: ${isScorm ? '✅ Ativado' : '❌ Desativado'}`);
console.log(`🐛 Debug: ${isDebug ? '✅ Ativado' : '❌ Desativado'}`);

console.log('\n🎯 Tipo de Build:');
if (isScorm && isDev) {
  console.log('📱 Desenvolvimento SCORM (npm run scorm-dev)');
} else if (isScorm && !isDev && isDebug) {
  console.log('🏭 Produção SCORM com Debug (npm run scorm-debug)');
} else if (isScorm && !isDev && !isDebug) {
  console.log('🏭 Produção SCORM (npm run scorm-prod)');
} else if (!isScorm && isDev) {
  console.log('📱 Desenvolvimento Standalone (npm run dev)');
} else if (!isScorm && !isDev) {
  console.log('🏭 Produção Standalone (npm run build)');
}

console.log('\n📋 Scripts Disponíveis:');
console.log('====================');
console.log('npm run dev           - Desenvolvimento Standalone');
console.log('npm run build         - Produção Standalone');
console.log('npm run scorm-dev     - Desenvolvimento SCORM');
console.log('npm run scorm-prod    - Produção SCORM');
console.log('npm run scorm-debug   - Produção SCORM com Debug');

console.log('\n📁 Arquivos de Ambiente:');
console.log('======================');
if (isScorm && isDev) {
  console.log('✅ .env.development.scorm');
} else if (isScorm && !isDev && isDebug) {
  console.log('✅ .env.production.scorm.debug');
} else if (isScorm && !isDev && !isDebug) {
  console.log('✅ .env.production.scorm');
} else if (!isScorm && isDev) {
  console.log('✅ .env.development');
} else if (!isScorm && !isDev) {
  console.log('✅ .env.production.standalone');
}

console.log('\n');
