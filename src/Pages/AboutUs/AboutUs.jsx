/** @format */

import React from "react";
import { Card } from "@/Components/UI/Card";
import { Heart, MapPin, Shield, Target, Zap } from "lucide-react";
import { Clock } from "lucide-react";

export const AboutUs = () => {
  return (
    <div className="pt-24 w-full">
      {/* Hero Section */}
      <section className="px-6 lg:px-8 py-16 lg:py-24 bg-Blue-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-Cairo font-bold text-Blue mb-6">
            عن مسعف
          </h1>
          <p className="text-lg lg:text-xl text-Blue-900 max-w-2xl mx-auto font-Cairo">
            توفير الوقت أثناء حالات الطوارئ من خلال ربطك بأقرب مرافق الرعاية
            الطبية على الفور.
          </p>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="px-6 lg:px-8 py-16 lg:py-24 bg-neutral">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-secondary font-bold text-foreground mb-4">
              عن المنصة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              يستخدم مسعف بيانات الموقع في الوقت الفعلي والخرائط التفاعلية
              لمساعدتك في العثور على خدمات الطوارئ والرعاية الطبية عندما تكون كل
              ثانية مهمة.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://c.animaapp.com/mj8wo9nyc5hWPL/img/ai_1.png"
              alt="medical map connection illustration"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="px-6 lg:px-8 py-16 lg:py-24 bg-background [direction='rtl'] ">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Vision Card */}
            <Card className="p-8 bg-card border-2 border-border [direction='rtl']">
              <div className="w-14 h-14 rounded-lg bg-Green/10 flex items-center justify-center mb-6 [direction='rtl']">
                <Target className="w-7 h-7 text-Green" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-secondary font-bold text-foreground mb-4">
                رؤيتنا
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                توفير وصول سريع إلى المساعدة الطبية الموثوقة، في أي مكان وزمان.
                نتصور عالماً لا يكون فيه العثور على رعاية الطوارئ عائقاً أمام
                إنقاذ الأرواح.
              </p>
            </Card>

            {/* Mission Card */}
            <Card className="p-8 bg-card border-2 border-border">
              <div className="w-14 h-14 rounded-lg bg-Green/10 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-Green" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-secondary font-bold text-foreground mb-4">
                مهمتنا
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                تمكين المرضى والعائلات من اتخاذ قرارات سريعة ودقيقة أثناء حالات
                الطوارئ الطبية من خلال توفير وصول فوري إلى مرافق الرعاية الصحية
                القريبة.
              </p>
            </Card>
          </div>
          {/* Why Musaef */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-secondary font-bold text-foreground mb-4">
              لماذا تختار مسعف
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ثلاثة مبادئ أساسية تجعل مسعف رفيقك الموثوق في رعاية الطوارئ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Speed */}
            <Card className="p-8 text-center bg-card border-2 border-border hover:border-primary/50 transition-colors duration-200">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-Green" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-secondary font-bold text-foreground mb-3">
                السرعة
              </h3>
              <p className="text-muted-foreground">
                نتائج فورية مع تحديد الموقع في الوقت الفعلي وخوارزميات بحث
                محسّنة
              </p>
            </Card>
            {/* Accuracy */}
            <Card className="p-8 text-center bg-card border-2 border-border hover:border-primary/50 transition-colors duration-200">
              <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-Green" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-secondary font-bold text-foreground mb-3">
                الدقة
              </h3>
              <p className="text-muted-foreground">
                بيانات موقع دقيقة ومعلومات محدثة عن المرافق يمكنك الاعتماد عليها
              </p>
            </Card>

            {/* Trust */}
            <Card className="p-8 text-center bg-card border-2 border-border hover:border-primary/50 transition-colors duration-200">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-Green" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-secondary font-bold text-foreground mb-3">
                الثقة
              </h3>
              <p className="text-muted-foreground">
                بيانات موثقة من مصادر موثوقة تضمن معلومات رعاية طوارئ موثوقة
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="px-6 lg:px-8 py-16 lg:py-24 bg-Green-600">
        <div className="max-w-3xl mx-auto text-center">
          <Clock
            className="w-16 h-16 text-white mx-auto mb-6"
            strokeWidth={1.5}
          />
          <h2 className="text-3xl lg:text-4xl font-secondary font-bold text-white mb-6">
            كل ثانية مهمة
          </h2>
          <p className="text-lg text-white/90 mb-8">
            في حالات الطوارئ، يمكن للوصول السريع إلى الرعاية الطبية أن يحدث
            فرقاً كبيراً. مسعف هنا لمساعدتك في العثور على الرعاية التي تحتاجها،
            عندما تحتاجها أكثر.
          </p>
        </div>
      </section>
    </div>
  );
};
