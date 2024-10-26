import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

const bucketExists = async (bucketName: string): Promise<boolean> => {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
        console.error('Error fetching buckets:', error);
        return false
    }
    const bucketFound = buckets.some(bucket => bucket.name === bucketName);
    return bucketFound;
}

const createBucket = async (bucketName: string): Promise<boolean> => {
  const { data, error } = await supabase.storage.createBucket(bucketName, { public: true });
  
  if (error) {
    throw new Error(`Error creating bucket: ${error.message}`);
  }

  return true;
};



export const uploadFile = async (file: any, bucket: string) => {
    try {
        const doesBucketExists: boolean = await bucketExists(bucket);
        if (!doesBucketExists) {
            await createBucket(bucket);
        }
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
        if (error) {
            console.error('Error uploading file:', error);
            return null
        }
        const { data: publicUrlData } = await supabase.storage.from(bucket).getPublicUrl(fileName)
        return publicUrlData.publicUrl
    } catch (error) {
        console.error('Error uploading file:', error);
        return null
    }

}