import "@hydrofoil/shaperone-wc";
import { renderer, components } from "@hydrofoil/shaperone-wc/configure";
import * as MaterialRenderStrategy from "@hydrofoil/shaperone-wc-material/renderer";
import * as vaadinComponents from "@hydrofoil/shaperone-wc-vaadin/components";
import { dataset } from "@rdf-esm/dataset";
import clownface from "clownface";
import { NodeShapeMixin } from "@rdfine/shacl";
import { ShapeBundle } from "@rdfine/shacl/bundles";
import { schema } from "@tpluscode/rdf-ns-builders";
import RdfResource from "@tpluscode/rdfine";

RdfResource.factory.addMixin(...ShapeBundle);

renderer.setStrategy(MaterialRenderStrategy);
components.pushComponents(vaadinComponents);

const resource = clownface({ dataset: dataset() }).blankNode();
const shape = new NodeShapeMixin.Class(
  clownface({ dataset: dataset() }).blankNode(),
  {
    property: [
      {
        path: schema.name,
        name: "Name",
        minCount: 1
      }
    ]
  }
);

const form = document.querySelector("shaperone-form");
form.shapes = shape.pointer;
form.resource = resource;
