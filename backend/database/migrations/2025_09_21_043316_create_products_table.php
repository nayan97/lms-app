use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');

            $table->string('title');
            $table->text('description')->nullable();

            $table->json('sizes')->nullable();
            $table->json('colors')->nullable();

            // ✅ all numeric as integer
            $table->integer('price');
            $table->integer('source_price')->nullable();
            $table->string('source_url')->nullable();

            $table->integer('cross_price')->nullable();
            $table->integer('max_price')->nullable();
            $table->integer('profit')->nullable();

            $table->enum('status', ['0', '1'])->default('1');
            $table->enum('is_featured', ['yes', 'no'])->default('no');

            $table->string('image');
            $table->json('image_gal')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
