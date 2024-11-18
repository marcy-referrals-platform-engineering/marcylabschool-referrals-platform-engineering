import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

const bucketExists = async (bucketName: string): Promise<boolean> => {
    const { data: buckets, error } = await supabase.storage.listBuckets();

    console.log('Buckets', buckets)
    const bucketFound = buckets!.some(bucket => bucket.name.toLowerCase() === bucketName.toLowerCase());
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
        console.log('Does it exist or not', doesBucketExists);

        if (!doesBucketExists) {
            await createBucket(bucket);
        }

        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
        if (error) {
            throw new Error(`Error uploading file: ${error.message}`);
        }

        console.log('File name', fileName);

        // Generate the public URL for the uploaded file
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);

        if (!urlData || !urlData.publicUrl) {
            throw new Error('Failed to generate public URL.');
        }

        return urlData.publicUrl;

    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
};
