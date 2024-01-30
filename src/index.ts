import FurnEngine from "./furnEngine/furnEngine.js";

const container_3D: HTMLDivElement = document.getElementById('engine') as HTMLDivElement;

const furnEngine = new FurnEngine()

furnEngine.init(container_3D, 1);