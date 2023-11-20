export interface LineItemInterface {
  partName: string;
  quantity: number;
  technology: 'CNC machining';
  material:
    | 'Polycarbonate'
    | 'Magnesium'
    | 'Aluminum'
    | 'Copper'
    | 'PVC'
    | 'Polypropylene'
    | 'PEEK'
    | 'PMMA (Acrylic)'
    | 'Mild steel'
    | 'POM (Delrin/Acetal)'
    | 'PS'
    | 'ABS'
    | 'Titanium'
    | 'LDPE'
    | 'Inconel'
    | 'Phosphor Bronze PB102'
    | 'FR4'
    | 'Brass'
    | 'Invar'
    | 'Nylon'
    | 'PBT'
    | 'G-10'
    | 'Alloy steel'
    | 'Stainless steel'
    | 'PEI'
    | 'Carbon fiber'
    | 'PET'
    | 'PTFE (Teflon)'
    | 'PPSU'
    | 'Polyethylene'
    | 'Tool steel'
    | 'CPVC'
    | 'PPE/PS'
    | 'PSU';
  finish:
    | 'As machined (Ra 3.2μm / Ra 126μin)'
    | 'Smooth machining (Ra 1.6μm / Ra 63μin)'
    | 'Polishing (Ra 0.8μm / Ra 32μin)'
    | 'Fine machining (Ra 0.8μm / Ra 32μin)'
    | 'Bead blasted'
    | 'Bead blasted + Anodized type II (Matte)'
    | 'Brushed + Anodized type II (Glossy)'
    | 'As machined + Anodized type III (Hardcoat)'
    | 'Powder coated'
    | 'Brushed (Ra 1.2μm / Ra 47μin)'
    | 'Chromate Conversion Coating'
    | 'As machined + Anodized type II'
    | 'Bead Blasted + Anodized type II (Glossy)'
    | 'Electroless Nickel Plating'
    | 'Bead Blasted + Anodized type III (Hardcoat)'
    | 'Bead Blasted + Chromate Conversion Coating'
    | 'Black oxide'
    | 'Brushed + Electropolished (Ra 0.8μm / Ra 32μin)';
  color: string;
  partMarkings: 'No' | 'Yes';
  generalTolerance: 'ISO 2768 Medium (m)' | 'ISO 2768 Fine (f)';
  tightestLinearTolerance: string;
  fits: 'No' | 'Yes';
  hasThreads: 'No' | 'Yes';
  internalCorners: '2mm radii' | 'Sharp';
  technicalDrawing: 'Yes' | 'No';
  customRequirements: string;
  note: string;
}
