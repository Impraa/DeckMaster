export function generateImageSlug(originalName: string) {
    const baseName = originalName.split('.')[0];
  
    const sanitizedBaseName = baseName.replace(/\s+/g, '-').toLowerCase();
  
    const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  
    const slug = `${sanitizedBaseName}-${uniqueSuffix}`;
  
    return slug;
  }