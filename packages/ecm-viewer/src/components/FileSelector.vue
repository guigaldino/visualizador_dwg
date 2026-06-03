<template>
  <aside class="file-selector">
    <div class="file-selector__header">
      <span class="file-selector__section-label">Arquivos disponíveis</span>
      <span class="file-selector__count">{{ files.length }}</span>
    </div>

    <ul class="file-selector__list" role="listbox" aria-label="Arquivos DWG disponíveis">
      <li
        v-for="(file, index) in files"
        :key="file.id"
        class="file-card"
        :class="{ 'file-card--selected': selectedId === file.id }"
        :style="{ animationDelay: `${index * 0.07}s` }"
        role="option"
        :aria-selected="selectedId === file.id"
        tabindex="0"
        @click="select(file)"
        @keydown.enter="select(file)"
        @keydown.space.prevent="select(file)"
      >
        <div class="file-card__icon-wrap">
          <svg class="file-card__icon" viewBox="0 0 36 44" fill="none" aria-hidden="true">
            <path d="M4 2h20l8 8v32a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="currentColor" opacity="0.08" stroke="currentColor" stroke-width="1.5" />
            <path d="M24 2l8 8h-8V2z" fill="currentColor" opacity="0.18" />
            <text x="18" y="30" text-anchor="middle" font-size="9" font-weight="700" font-family="Inter, sans-serif" fill="currentColor" letter-spacing="0.5">DWG</text>
          </svg>
        </div>

        <div class="file-card__info">
          <span class="file-card__name">{{ file.name }}</span>
          <div class="file-card__meta">
            <span class="file-card__type">DWG</span>
            <span v-if="file.size" class="file-card__size">{{ file.size }}</span>
          </div>
        </div>

        <div class="file-card__indicator" aria-hidden="true">
          <svg v-if="selectedId === file.id" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.3 5.3-4 4a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 1 1 1.06-1.06l.97.97 3.47-3.47a.75.75 0 0 1 1.06 1.06z"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="file-card__chevron">
            <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06z"/>
          </svg>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { DwgFile } from '../types'

defineProps<{
  files: DwgFile[]
}>()

const emit = defineEmits<{
  select: [file: DwgFile]
}>()

const selectedId = ref<string | null>(null)

function select(file: DwgFile) {
  selectedId.value = file.id
  emit('select', file)
}
</script>

<style scoped>
.file-selector {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-right: 1px solid rgba(220, 233, 240, 0.7);
  overflow: hidden;
}

.file-selector__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 10px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(220, 233, 240, 0.5);
}

.file-selector__section-label {
  font-size: 11px;
  font-weight: 700;
  color: #8896a7;
  text-transform: uppercase;
  letter-spacing: 0.7px;
}

.file-selector__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: linear-gradient(135deg, #38b2d8, #42bde3);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  border-radius: 10px;
}

.file-selector__list {
  list-style: none;
  padding: 10px 10px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.file-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1.5px solid transparent;
  background: #f7fbfd;
  cursor: pointer;
  transition:
    background 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.35s ease-out both;
  outline: none;
}

.file-card:hover {
  background: #edf6fa;
  border-color: rgba(66, 189, 227, 0.4);
  box-shadow: 0 4px 12px rgba(18, 50, 64, 0.08);
  transform: translateY(-1px);
}

.file-card:focus-visible {
  border-color: #42bde3;
  box-shadow: 0 0 0 3px rgba(66, 189, 227, 0.25);
}

.file-card--selected {
  background: #eef9fb;
  border-color: #42bde3;
  box-shadow: 0 4px 16px rgba(66, 189, 227, 0.22);
}

.file-card--selected:hover {
  transform: none;
}

.file-card__icon-wrap {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 42px;
}

.file-card__icon {
  width: 30px;
  height: 36px;
  color: #38b2d8;
}

.file-card--selected .file-card__icon {
  color: #42bde3;
}

.file-card__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-card__name {
  font-size: 13px;
  font-weight: 600;
  color: #1d2b3d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.file-card__meta {
  display: flex;
  align-items: center;
  gap: 6px;
}

.file-card__type {
  font-size: 10px;
  font-weight: 700;
  color: #38b2d8;
  background: rgba(56, 178, 216, 0.1);
  border: 1px solid rgba(56, 178, 216, 0.2);
  border-radius: 4px;
  padding: 1px 5px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.file-card--selected .file-card__type {
  color: #42bde3;
  background: rgba(66, 189, 227, 0.12);
  border-color: rgba(66, 189, 227, 0.3);
}

.file-card__size {
  font-size: 11px;
  font-weight: 500;
  color: #8896a7;
}

.file-card__indicator {
  flex-shrink: 0;
  color: #8896a7;
  transition: color 0.18s ease;
}

.file-card--selected .file-card__indicator {
  color: #42bde3;
}

.file-card__chevron {
  opacity: 0.4;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.file-card:hover .file-card__chevron {
  opacity: 0.7;
  transform: translateX(2px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
