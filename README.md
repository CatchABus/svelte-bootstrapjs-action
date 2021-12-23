# svelte-bootstrapjs-action

[![NPM version](https://img.shields.io/npm/v/svelte-bootstrapjs-action.svg?style=flat)](https://www.npmjs.com/package/svelte-bootstrapjs-action) [![NPM downloads](https://img.shields.io/npm/dm/svelte-bootstrapjs-action.svg?style=flat)](https://www.npmjs.com/package/svelte-bootstrapjs-action) [![Svelte v3](https://img.shields.io/badge/svelte-v3-blueviolet.svg)](https://svelte.dev)

A Svelte action plugin that enables Bootstrap JavaScript functionality on Bootstrap 5 elements.

## Features

This is a Svelte action to manage Bootstrap JavaScript.

- Easy to use
- Handles creation/disposal of Bootstrap instances to avoid memory leaks
- Access to instances using callbacks for `mount, update, destroy` lifecycles.
- Reactivity

## Installation

```bash
npm i svelte-bootstrapjs-action
```

## Usage

Before anything else, please afford some time to read more about [Bootstrap 5 JavaScript](https://getbootstrap.com/docs/5.0/getting-started/javascript/).  
This will also help you understand which Bootstrap JS class and configuration to use depending on DOM element(s).

Here is an example using Bootstrap 5 Accordion.  
You can also check a demo sample in [Svelte REPL](https://svelte.dev/repl/5ba0bbc752fc42dea52456f0f302259c?version=3.43.0)!



```svelte
<script>
	import { Collapse } from "bootstrap";
	import bootstrapjs from "svelte-bootstrapjs-action";

	let bsItems = [];
	let bsConfig = {type: Collapse, config: {toggle: false}, mount: (instance) => bsItems.push(instance), destroy: (instance) => bsItems.splice(bsItems.indexOf(instance), 1)};

	function toggleAccordionItems(event) {
		// Using constructor configuration schema
		bsConfig.config = {toggle: true};
		bsConfig = bsConfig;
	}
</script>
<div class="my-4">
	<button on:click={toggleAccordionItems}>
		Toggle Collapse State
	</button>
</div>
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div use:bootstrapjs={bsConfig} id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne">
      <div class="accordion-body">
        I'm the content.
      </div>
    </div>
  </div>
</div>
```

## API

### Parameters

| Name  | Type   | Description     |
| ----- | ------ | --------------- |
| type  | N/A | The Bootstrap 5 JavaScript class to use for creating the instance. |
| config | Object | (Optional) The Bootstrap 5 configuration that is passed as a second parameter to constructor for all instances. |
| mount | Function | (Optional) A callback with new bootstrap instance as an argument that is called on element creation. |
| update | Function | (Optional) A callback with new and old bootstrap instances as arguments that is called on element update. |
| destroy | Function | (Optional) A callback with old bootstrap instance as an argument that is called on element destruction. |