const Movie = require('../Models/Movie');


const addMovie = async (req,res) => {
    try{
        const {name, summary} = req.body;

        if(!name || !summary){
            return res.status(404).json({
                success:false,
                message:'Missing required fields'
            })
        };

        const movie = new Movie({
            name: req.body.name,
            summary: req.body.summary,
            img: req.file ? `/uploads/${req.file.filename}` : ''
        });
        await movie.save();
        
        return res.status(200).json({
            success:true,
            message:"Movie added successfully"
        })
    }catch(error){
        console.error("Error in addMovie", error.message)
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
};


const getMovies = async (req,res) => {
    try{
        const movies = await Movie.find().sort({_id:-1});

        return res.status(200).json({
            success:true,
            data:movies
        })
    }catch(error){
        console.error("Error in getMovies", error.message)
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
};


const getMovie = async (req,res) => {
    try{
        const {id} = req.params;

        const movie = await Movie.findById({_id:id});

        return res.status(200).json({
            success:true,
            data:movie
        })
    }catch(error){
        console.error("Error in getMovie", error.message)
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
};


const updateMovie = async (req,res) => {
    try{
        const {id} = req.params;
        const updateMovie = await Movie.findByIdAndUpdate(
            {_id:id}, 
           {name: req.body.name , summary: req.body.summary, img: req.file ? `/uploads/${req.file.filename}` : ''},
            {new:true})

        if(!updateMovie){
            return res.status(404).json({
                success:false,
                message:'Movie not found'
            })
        };


        return res.status(200).json({
                success:true,
                message:'Updated successfully',
                data:updateMovie
            })
    }catch(error){
        console.error("Error in updateMovie", error.message)
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
};

const deleteMovie = async (req,res) => {
    try{
        const result = await Movie.findByIdAndDelete({_id:req.params.id});
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Movie not found"
            })
        };

        return res.status(200).json({
            success:true,
            message:"Movie deleted"
        })
    }catch(error){
        console.error("Error in deleteMovie", error.message)
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}


module.exports = {
    addMovie,
    getMovies,
    getMovie,
    updateMovie,
    deleteMovie
}